import * as extensions from '../../extensions';
import * as types from '../constants/actionTypes';
import { initialState } from '../reducers/editorReducer';
import * as actions from '../actions/editorActions';

export const documentUpdater = store => next => action => {
  const watchables = {
    [types.EXPORT_DOCUMENT]: ({ editorReducer }, { extension }) => {
      if (!extensions[extension]) {
        return;
      }
      extensions[extension].fromHTML(
        editorReducer.documents[editorReducer.currentDocument].content,
        editorReducer.documents[editorReducer.currentDocument].title
      );
    },
    [types.IMPORT_DOCUMENT]: ({ editorReducer }, { file }) => {
      const reader = new FileReader();
      reader.onload = async (fileContainer) => {
        try {
          const arrayBuffer = fileContainer.target.result;
          const extension = file.name.replace(/(.*)\.(.*?)$/, "$2");

          console.log(extensions, extension, extensions[extension]);
          if (!extensions[extension]) {
            throw new Error(`${extension} is not a supported file type`);
          }

          const html = await extensions[extension].toHTML(arrayBuffer);

          const document = {
            title: file.name.replace(/(.*)\.(.*?)$/, "$1"),
            content: html,
          };
          console.log(document);
          store.dispatch(actions.importDocumentSuccess(document));
        } catch (error) {
          reader.abort();
          store.dispatch(actions.importDocumentError(error));
        }
      };
      reader.onerror = (error) => {
        reader.abort();
        store.dispatch(actions.importDocumentError(error));
      }
      reader.readAsArrayBuffer(file);
    },
    [types.MODIFY_DOCUMENT]: ({ editorReducer }, action) => {
      const { command, value } = action;
      // NOTE: actual commands may be different from their corresponding
      // modifiers (e.g strikeThrough), some modifiers can group many commands
      // (like justify) and some need additional actions (fontSize) taken
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
          const change = justifyHandlers[value](true);
          return change;
        },
      };

      const { change } = commandHandlers[command](value);

      const modifiers = {
        ...editorReducer.modifiers,
        ...change,
      };

      store.dispatch(actions.setModifiers(modifiers));
      store.dispatch(actions.saveDocument());
      return;
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
        store.dispatch(actions.setModifiers(modifiers));
        return;
      }

      // Otherwise we need to construct modifiers object by traversing DOM to the container and
      // applying handlers to, like, parse it
      const modifiers = Object.entries(selectorHandlers).reduce((acc, [selector, handler]) => {
        const closest = anchor.closest(selector);
        const closestExists = closest !== null && container.contains(closest);
        return closestExists ? { ...acc, ...handler(closest) } : acc;
      }, { ...initialState.modifiers });

      store.dispatch(actions.setModifiers(modifiers));
      return;
    },
  };

  if (Object.prototype.hasOwnProperty.call(watchables, action.type)) {
    const state = store.getState();
    watchables[action.type](state, action);
  }
  
  return next(action);
};

export default documentUpdater;
