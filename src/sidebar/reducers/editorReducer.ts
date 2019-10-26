import { uniqueId } from 'lodash';
import * as types from '../constants/actionTypes';
import { createReducer } from '../../utils';

const documentId = () => uniqueId('document');

export const initialState = {
  documents: [
    {
      title: 'Greetings!',
      content: "<div align=\"center\">Greetings traveller!</div><div>Welcome to just another text editor, right inside your browser - <b>Pocket Editor</b>!</div><div><br></div><div>Enjoy its neat features, such as:</div><div><ul><li>Slow text editing</li><li>You can edit multiple documents - use controls at the bottom of the screen to navigate through them. Click on document's title to change it<br></li><li>Import / Export files</li><li><div align=\"right\">...though currently only .doc is supported</div></li></ul>There <strike>are</strike> may be bugs to encounter, since it is in early stage of development and is not block-based!</div><div><br></div><div>Use it just like a typical rich text editor!<br></div><div><br></div>",
      id: documentId('document'),
    },
  ],
  currentDocument: 0,
  errors: [],
};

export const handlers = {
  [types.NEW_DOCUMENT]: (state, action) => {
    const newDocument = {
      title: 'Untitled',
      content: '<p><br></p>',
      id: documentId(),
    };
    return {
      ...state,
      documents: state.documents.concat(newDocument),
      currentDocument: state.documents.length,
    };
  },
  [types.SET_CURRENT_DOCUMENT]: (state, { index }) => ({ ...state, currentDocument: index }),
  [types.IMPORT_DOCUMENT_SUCCESS]: (state, { document }) => {
    const newDocument = { ...document, id: documentId() };
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
  [types.DELETE_DOCUMENT]: (state) => {
    const documents = state.documents.filter((document, index) => index !== state.currentDocument);
    return {
      ...state,
      documents,
      currentDocument: documents.length - 1,
    };
  },
};

const editorReducer = createReducer(handlers, initialState);

export default editorReducer;
