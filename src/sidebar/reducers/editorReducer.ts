import * as types from '../constants/actionTypes';
import { omitBy, isUndefined, isNaN, merge } from 'lodash';
import mammoth from 'mammoth';

const initialState = {
  documents: [],
  modifiers: {
    font: '',
    fontSize: null,
    italic: false,
    bold: false,
    underline: false,
    strikethrough: false,
    ordered: false,
    unordered: false,
    justify: null,
  },
};

const handlers = {
  [types.EXPORT_DOCUMENT]: (state, action) => {
    const payload = JSON.stringify(state()['#input-blacklist-pattern']);
    const a = document.createElement('a');
    a.download = 'TotalSuspenderBlacklist.json';
    a.href = `data:application/octet-stream,${payload}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    return state;
  },
  [types.IMPORT_DOCUMENT]: (state, action) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (fileContainer) => {
        const arrayBuffer = fileContainer.target.result;

        const transformElement = (element) => {
          if (element.children) {
            var children = _.map(element.children, transformElement);
            element = {...element, children: children};
          }

          if (element.type === "paragraph") {
            element = transformParagraph(element);
          }

          return element;
        }

        const transformParagraph = (element) => {
          if (element.alignment === "center" && !element.styleId) {
            return {...element, styleId: "Heading2"};
          } else {
            return element;
          }
        }
        const html = await mammoth.convertToHtml({ arrayBuffer }, {
          ignoreEmptyParagraphs: false,
          transformDocument: transformElement,
        });

        document.querySelector("#textBox").innerHTML = html.value;
        document.body.removeChild(fileInput);
      };
      reader.readAsArrayBuffer(file);
    };
    document.body.appendChild(fileInput);
    fileInput.click();

    return state;
  },
  [types.RETRIEVE_MODIFIERS]: (state, action) => {
    const { command, value } = action;
    if (command) {
      // NOTE: actual commands may be different from their corresponding
      // modifiers (e.g strikeThrough), some modifiers can group many commands
      // (like justify) and some need additional acitons (fontSize) taken
      const makeHandler = command => (value) => {
        document.execCommand(command, false, value);
        const commandStatus = document.queryCommandState(command); // indicates whether command is still active
        const change = { [command]: commandStatus && value, };
        return { change, commandStatus };
      };

      const commandHandlers = {
        strikethrough: (value) => {
          const { commandStatus } = makeHandler('strikeThrough')(value);
          return {
            change: { strikethrough: commandStatus && value, },
            commandStatus,
          };
        },
        bold: makeHandler('bold'),
        underline: makeHandler('underline'),
        italic: makeHandler('italic'),
        ordered: makeHandler('insertOrderedList'),
        unordered: makeHandler('insertUnorderedList'),
        justify: (value) => {
          const justifyHandlers = {
            left: makeHandler('justifyLeft'),
            center: makeHandler('justifyCenter'),
            right: makeHandler('justifyRight'),
            full: makeHandler('justifyFull'),
          };

          return justifyHandlers[value](true);
        },
        font: (value) => {
          const { change, commandStatus } = makeHandler('fontName')(value);
          return {
            change: { font: value, },
            commandStatus,
          };
        },
        fontSize: (value) => {
          // NOTE: fontSizes are limited to 1-7, so set it to 7, thus creating a new parent node of
          // font with size attribute set, find closest matching size selector and set style
          // font-size to custom size value. This approach, however, creates problems when
          // working with selections with font size already set, since custom style and font
          // size won't get restructured. Fix this manually - if somewhere upper in the tree
          // font-size already exists, set it to other value!
          // Yeah, this is a footgun
          //
          // NOTE: get anchor, focus AFTER having commands executed
          // (i.e DOM being modified) to get expected results, don't optimize code by moving
          // this anchor, anchorNode to top

          // remove size attributes set to 7 from ALL elements inside selection
          const { change, commandStatus } = makeHandler('fontSize')('6');
       
          // now we have only one element with font size attribute set, but styled font elements
          // still exist, they may be font-family related and/or font-size related
          // set font-size style
          
          const { focusNode } = window.getSelection(); // anchor - start, focus - end
          const focus = focusNode.parentElement;
          const selector = 'FONT[size="6"]';
          const closest = focus.closest(selector);
          closest.style['font-size'] = `${value}px`;
          console.log(closest);

          const descendants = closest.getElementsByTagName("FONT");

          for (let element of descendants) {
            element.style['font-size'] = null;
            // if font element has empty styles remove that attribute
            if (!element.style.length) element.removeAttribute('style');

            // if font node has no attributes after this operation 
            // remove it from the DOM, but preserve its children
            if (!element.attributes.length) {
              const fragment = document.createDocumentFragment();
              while(element.firstChild) {
                fragment.appendChild(element.firstChild);
              }
              element.parentNode.replaceChild(fragment, element);
            }
          };
          closest.normalize(); // remove empty text-nodes, concat adjacent ones*/

          closest.setAttribute('size', '6')
          return {
            change: { fontSize: value, },
            commandStatus,
          };
        },
      };

      const { change } = commandHandlers[command](value);
      const modifiers = {
        ...state.modifiers,
        ...change,
      };
      const newState = {
        ...state,
        modifiers,
      };

      return newState;
    }

    const selectorHandlers = {
      'UL': () => ({ unordered: true }),
      'OL': () => ({ ordered: true }),
      'B': () => ({ bold: true }),
      'I':() => ({ italic: true }),
      'U': () => ({ underline: true }),
      'STRIKE':() => ({ strikethrough: true }),
      'DIV[align]': node => ({ justify: node.align }),
      'FONT[face]': node => ({ font: node.face }),
      'FONT[style*="font-size"]': node => ({ fontSize: Number.parseInt(node.style['font-size']) }),
    };

    const { anchorNode, focusNode } = window.getSelection(); // anchor - start, focus - end
    const anchor = anchorNode.parentElement;
    const focus = focusNode.parentElement;
    const container = document.querySelector("#textBox"); // topmost contentEditable element

    // execCommand only 'negates' current modifier only if anchor and focus are
    // equal in terms of node they represent, otherwise it will create new node,
    // so compare parents and show user default values (unset) if they are NOT equal
    if (anchor !== focus) {
      return initialState;
    }

    // Otherwise we need to construct modifiers object by traversing DOM to the container and
    // applying handlers to, like, parse it
    const modifiers = Object.entries(selectorHandlers).reduce((acc, [selector, handler]) => {
      const closest = anchor.closest(selector);
      const closestExists = closest !== null && container.contains(closest);
      return closestExists ? { ...acc, ...handler(closest) } : acc;
    }, { ...initialState.modifiers });

    return {
      ...state,
      modifiers,
    };
  },
};

const editorReducer = (state = initialState, action) => {
  if (!Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return state;
  }
  return handlers[action.type](state, action);
};

export default editorReducer;
