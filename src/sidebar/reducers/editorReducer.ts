import * as types from '../constants/actionTypes';
import { uniqueId } from 'lodash';

export const initialState = {
  documents: [
    {
      title: 'U',
      content: '<p>L0or<b>em</b> ipsum</p>',
      ref: null,
      id: uniqueId(),
    },
    {
      title: 'Untiasdffffffffffffffffffffffffffffffffffffffffffffffftled',
      content: '<p>T1st</p>',
      ref: null,
      id: uniqueId(),
    },
    {
      title: 'asdffasdffffffffffffffffff',
      content: '<p>T2st</p>',
      ref: null,
      id: uniqueId(),
    },
    {
      title: 'affffffffffffff',
      content: '<p>Ts3st</p>',
      ref: null,
      id: uniqueId(),
    },
    {
      title: 'asdffasdffffffffffffffffff',
      content: '<p>s4st</p>',
      ref: null,
      id: uniqueId(),
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
      content: '<p><br></p>',
      id: uniqueId(),
      ref: null,
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
    const documents = state.documents.map((document, index) => index === state.currentDocument 
      ? { ...document, content: document.ref.innerHTML }
      : document
    );
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
