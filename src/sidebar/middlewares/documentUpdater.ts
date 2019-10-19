import mammoth from 'mammoth';

import * as types from '../constants/actionTypes';
import { initialState } from '../reducers/editorReducer';
import { setModifiers } from '../actions/editorActions';

export const documentUpdater = store => next => action => {
  const watchables = {
  /*
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
    [types.IMPORT_DOCUMENT]: (action) => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async (fileContainer) => {
          const arrayBuffer = fileContainer.target.result;
          const html = await mammoth.convertToHtml({ arrayBuffer }, {
            ignoreEmptyParagraphs: false,
          });

          document.querySelector("#textBox").innerHTML = html.value;
          document.body.removeChild(fileInput);
        };
        reader.onerror = (e) => {
          reader.abort();
          store.dispatch({ type: 'STOP_PLAYING', origin: playbackOrigin });
        }
        reader.readAsArrayBuffer(file);
      };
      document.body.appendChild(fileInput);
      fileInput.click();

      return state;
    },*/
    [types.MODIFY_DOCUMENT]: ({ editorReducer }, action) => {
      const { command, value } = action;
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
        redo: () => {
          const { commandStatus } = makeHandler('redo')();
          return {
            change: {},
            commandStatus,
          };
        },
        undo: () => {
          const { commandStatus } = makeHandler('undo')();
          return {
            change: {},
            commandStatus,
          };
        },
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
      };

      const { change } = commandHandlers[command](value);

      const modifiers = {
        ...editorReducer.modifiers,
        ...change,
      };
      return store.dispatch(setModifiers(modifiers));
    },
    [types.RETRIEVE_MODIFIERS]: ({ editorReducer }, action) => {
      const { documents, currentDocument } = editorReducer;
      const selectorHandlers = {
        'UL': () => ({ unordered: true }),
        'OL': () => ({ ordered: true }),
        'B': () => ({ bold: true }),
        'STRONG': () => ({ bold: true }),
        'I':() => ({ italic: true }),
        'U': () => ({ underline: true }),
        'STRIKE':() => ({ strikethrough: true }),
        'DIV[align]': node => ({ justify: node.align }),
      };

      const { anchorNode, focusNode } = window.getSelection(); // anchor - start, focus - end
      const anchor = anchorNode.parentElement;
      const focus = focusNode.parentElement;
      const container = documents[currentDocument].ref; // topmost contentEditable element

      // execCommand only 'negates' current modifier only if anchor and focus are
      // equal in terms of node they represent, otherwise it will create new node,
      // so compare parents and show user default values (unset) if they are NOT equal
      if (anchor !== focus) {
        const { modifiers } = initialState;
        return store.dispatch(setModifiers(modifiers));
      }

      // Otherwise we need to construct modifiers object by traversing DOM to the container and
      // applying handlers to, like, parse it
      const modifiers = Object.entries(selectorHandlers).reduce((acc, [selector, handler]) => {
        const closest = anchor.closest(selector);
        const closestExists = closest !== null && container.contains(closest);
        return closestExists ? { ...acc, ...handler(closest) } : acc;
      }, { ...initialState.modifiers });

      return store.dispatch(setModifiers(modifiers));
    },
  };

  if (Object.prototype.hasOwnProperty.call(watchables, action.type)) {
    const state = store.getState();
    watchables[action.type](state, action);
  }
  
  return next(action);
};

export default documentUpdater;
