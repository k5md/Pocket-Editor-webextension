import * as types from '../constants/actionTypes';
import { omitBy, isUndefined, isNaN, merge } from 'lodash';


const initialState = {
  documents: [],
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

};

const editorReducer = (state = initialState, action) => {
  if (!Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return state;
  }
  return handlers[action.type](state, action);
};

export default editorReducer;
