import { uniqueId } from 'lodash';
import * as types from '../constants/actionTypes';
import { createReducer } from '../../utils';

export const initialState = {
  documents: [
    {
      title: 'Greetings, travellerasdfasdffffffffffffffff! asdfffffffffffffffff',
      content: '<p>L0or<b>em</b> ipsum</p>',
      id: uniqueId(),
    },
  ],
  modifiers: {
    italic: false,
    bold: false,
    underline: false,
    strikethrough: false,
    ordered: false,
    unordered: false,
    justify: null,
  },
  currentDocument: 0,
  errors: [],
};

export const handlers = {
  [types.NEW_DOCUMENT]: (state, action) => {
    const newDocument = {
      title: 'Untitled',
      content: '<p><br></p>',
      id: uniqueId('document'),
    };
    return {
      ...state,
      documents: state.documents.concat(newDocument),
      currentDocument: state.documents.length,
    };
  },
  [types.SET_CURRENT_DOCUMENT]: (state, { index }) => ({ ...state, currentDocument: index}),
  [types.SET_MODIFIERS]: (state, { modifiers }) => ({ ...state, modifiers }),
  [types.IMPORT_DOCUMENT_SUCCESS]: (state, { document }) => {
    const newDocument = { ...document, ref: null, id: uniqueId(), };
    const documents = state.documents.concat(newDocument);
    return { ...state, documents, currentDocument: state.documents.length };
  },
  [types.IMPORT_DOCUMENT_ERROR]: (state, { error }) => ({
    ...state,
    errors: state.errors.concat(error),
  }),
  [types.SAVE_DOCUMENT]: (state, { content }) => {
    const documents = state.documents.map((document, index) => index === state.currentDocument 
      ? { ...document, content }
      : document
    );
    return { ...state, documents };
  },
};

const editorReducer = createReducer(handlers, initialState);

export default editorReducer;
