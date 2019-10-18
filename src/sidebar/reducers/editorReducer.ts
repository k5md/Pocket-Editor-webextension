import * as types from '../constants/actionTypes';
import { omitBy, isUndefined, isNaN, merge } from 'lodash';


const initialState = {
  documents: [
    { title: 'Untitled', content: '<p>Lorem ipsum</p>' },
    { title: 'Untitled', content: '<p>Test</p>' },
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
};

const handlers = {
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
};

const editorReducer = (state = initialState, action) => {
  if (!Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return state;
  }
  return handlers[action.type](state, action);
};

export default editorReducer;
