import * as types from '../constants/actionTypes';
import { omitBy, isUndefined, isNaN, merge } from 'lodash';

export const initialState = {
  documents: [
    { title: 'U', content: '<p>Lor<b>em</b> ipsum</p>', ref: null },
    { title: 'Untiasdffffffffffffffffffffffffffffffffffffffffffffffftled', content: '<p>Test</p>', ref: null },
    { title: 'asdffasdffffffffffffffffff', content: '<p>Test</p>', ref: null },
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
      content: '',
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
    const newDocument = { ...document, ref: null };
    const documents = state.documents.concat(newDocument);
    return { ...state, documents };
  },
  [types.IMPORT_DOCUMENT_ERROR]: (state, { error }) => ({
    ...state,
    errors: state.errors.concat(error),
  }),
};

export const editorReducer = (state = initialState, action) => {
  if (!Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return state;
  }
  return handlers[action.type](state, action);
};

export default editorReducer;
