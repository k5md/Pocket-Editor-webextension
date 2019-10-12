import * as types from '../constants/actionTypes';
import { omitBy, isUndefined, isNaN } from 'lodash';
import mammoth from 'mammoth';

const initialState = {
  documents: [],
  modifiers: {
    font: 'Arial',
    fontSize: 12,
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
    // TODO: remove this awful non-pure bs from reducer!!!
    const { command, value } = action;

    if (command) {
      const commandHandlers = {
        bold: (value) => {
          document.execCommand('bold', false, value);
          return document.queryCommandState(command);
        },
        underline: (value) => {
          document.execCommand('underline', false, value);
          return document.queryCommandState(command);
        },
        italic: (value) => {
          document.execCommand('italic', false, value);
          return document.queryCommandState(command);
        },
        strikethrough: (value) => {
          document.execCommand('strikeThrough', false, value);
          return document.queryCommandState(command);
        },
        ordered: (value) => {
          document.execCommand('insertOrderedList', false, value);
          return document.queryCommandState(command);
        },
        unordered: (value) => {
          document.execCommand('insertUnorderedList', false, value);
          return document.queryCommandState(command);
        },
        justify: (value) => {

        },
        font: (value) => document.execCommand('font', false, value),
        fontSize: (value) => {
          /*if (node.parentNode.nodeName === 'FONT' && node.parentNode) {
            document.execCommand("fontSize", false, "7");
            node.parentNode.style['font-size'] = `${item}px`;
          }*/
        },
      };

      const commandStatus = commandHandlers[command](value);
      console.log(command, commandStatus, value && commandStatus);
      const oldState = state;
      const newState = {
        ...state,
        modifiers: {
          ...state.modifiers,
          [command]: value && commandStatus,
        },
      };
      return newState;
    }

    const selectorHandlers = {
      'UL': () => ({ unordered: true }),
      'OL': () => ({ ordered: true }),
      'B': () => ({ bold: true }),
      'I':() => ({ italic: true }),
      'U': () => ({ underlined: true }),
      'STRIKE':() => ({ strikethrough: true }),
      'DIV[align]': node => ({ justify: node.align }),
      'FONT[face]': node => ({ font: node.face }),
      'FONT[style*="font-size"]': node => ({ fontSize: Number.parseInt(node.style['font-size']) }),
    };

    const { anchorNode, focusNode } = window.getSelection(); // anchor - start, focus - end
    const anchor = anchorNode.parentElement;
    const focus = focusNode.parentElement;
    // execCommand only 'negates' current modifier only if anchor and focus are
    // equal in terms of node they represent, otherwise it will create new node,
    // so compare parents and show user default values (unset) if they are NOT equal
    if (anchor !== focus) {
      return initialState;
    }

    // Otherwise we need to construct modifiers object by traversing DOM to the container and
    // applying handlers to, like, parse it
    const container = document.querySelector("#textBox"); // topmost contentEditable element
    const modifiers = Object.entries(selectorHandlers).reduce((acc, [selector, handler]) => {
      const closest = anchor.closest(selector);
      const closestExists = closest !== null && container.contains(closest);
      return closestExists ? { ...acc, ...handler(closest) } : acc;
    }, { ...initialState.modifiers });

    return {
      ...state,
      modifiers
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
