import uniqueId from 'lodash/uniqueId';
import * as types from '../constants/actionTypes';
import { createReducer } from '../../utils';

const documentId = (documentIds) => {
  let nextId = uniqueId('document'); // eslint-disable-line functional/no-let
  while (documentIds.includes(nextId)) { // eslint-disable-line functional/no-loop-statement
    nextId = uniqueId('document');
  }
  return nextId;
};

export const initialState = {
  documents: [
    {
      title: browser.i18n.getMessage('documentGreetingsTitle'),
      content: browser.i18n.getMessage('documentGreetingsContent'),
      id: documentId([]),
    },
  ],
  currentDocument: 0,
  errors: [],
};

export const handlers = {
  [types.NEW_DOCUMENT]: (state) => {
    const documentIds = state.documents.map(({ id }) => id);
    const newDocument = {
      title: browser.i18n.getMessage('documentUntitled'),
      content: '<p><br></p>',
      id: documentId(documentIds),
    };
    return {
      ...state,
      documents: state.documents.concat(newDocument),
      currentDocument: state.documents.length,
    };
  },
  [types.SET_CURRENT_DOCUMENT]: (state, { index }) => ({ ...state, currentDocument: index }),
  [types.IMPORT_DOCUMENT_SUCCESS]: (state, { document }) => {
    const documentIds = state.documents.map(({ id }) => id);
    const newDocument = { ...document, id: documentId(documentIds) };
    const documents = state.documents.concat(newDocument);
    return { ...state, documents, currentDocument: state.documents.length };
  },
  [types.IMPORT_DOCUMENT_ERROR]: (state, { error }) => ({
    ...state,
    errors: state.errors.concat(error),
  }),
  [types.SAVE_DOCUMENT]: (state, { content }) => {
    const documents = state.documents.map((document, index) => (index === state.currentDocument
      ? { ...document, content }
      : document));
    return { ...state, documents };
  },
  [types.DELETE_DOCUMENT]: (state) => {
    const documents = state.documents.filter((_document, index) => index !== state.currentDocument);
    return {
      ...state,
      documents,
      currentDocument: documents.length - 1,
    };
  },
  [types.SET_DOCUMENT_TITLE]: (state, { title }) => {
    const documents = state.documents.map((document, index) => (index === state.currentDocument
      ? { ...document, title }
      : document));
    return { ...state, documents };
  },
};

const editorReducer = createReducer(handlers, initialState);

export default editorReducer;
