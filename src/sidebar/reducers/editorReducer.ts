import * as types from '../constants/actionTypes';
import { uniqueId } from 'lodash';

export const initialState = {
  documents: [
    {
      title: 'U',
      content: '<p>Lor<b>em</b> ipsum</p>',
      ref: null,
      id: 0,
    },
    {
      title: 'Untiasdffffffffffffffffffffffffffffffffffffffffffffffftled',
      content: '<p>Test</p>',
      ref: null,
      id: 1,
    },
    {
      title: 'asdffasdffffffffffffffffff',
      content: '<p>Test</p>',
      ref: null,
      id: 2,
    },
    {
      title: 'affffffffffffff',
      content: '<p>Tsst</p>',
      ref: null,
      id: 3,
    },
    {
      title: 'asdffasdffffffffffffffffff',
      content: '<p>sst</p>',
      ref: null,
      id: 4,
    },
  ],
  currentDocument: 0,
  modifiers: {
    italic: false,
    bold: false,
    underline: false,
    strikethrough: false,
    ordered: false,
    unordered: false,
    justify: null,
  },
  errors: [],
};

export const handlers = {
  [types.NEW_DOCUMENT]: (state, action) => {
    const newDocument = {
      title: 'Untitled',
      content: '<p></p>',
      id: uniqueId(),
    };
    return {
      ...state,
      documents: state.documents.concat(newDocument),
      currentDocument: state.documents.length,
    };
  },
  [types.SET_ACTIVE_DOCUMENT]: (state, { index }) => ({ ...state, currentDocument: index}),
  [types.SET_DOCUMENT_REF]: (state, { ref }) => {
    let documents = [ ...state.documents ];
    documents[state.currentDocument].ref = ref;
    return { ...state, documents };
  },
  [types.SET_MODIFIERS]: (state, { modifiers }) => ({ ...state, modifiers }),
  [types.IMPORT_DOCUMENT_SUCCESS]: (state, { document }) => {
    const newDocument = { ...document, ref: null, id: uniqueId(), };
    const documents = state.documents.concat(newDocument);
    return { ...state, documents };
  },
  [types.IMPORT_DOCUMENT_ERROR]: (state, { error }) => ({
    ...state,
    errors: state.errors.concat(error),
  }),
  [types.SAVE_DOCUMENT]: (state) => {
    const newDocument = { ...state.documents[state.currentDocument], content: state.documents[state.currentDocument].ref.innerHTML };
    let documents = [ ...state.documents ];
    documents.splice(state.currentDocument, 1, newDocument);
    return { ...state, documents };
  },
};

export const editorReducer = (state = initialState, action) => {
  if (!Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return state;
  }
  return handlers[action.type](state, action);
};

export default editorReducer;
