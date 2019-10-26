import * as types from '../constants/actionTypes';
import { createReducer } from '../../utils';

export const initialState = {
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

export const handlers = {
  [types.SET_MODIFIERS]: (state, { modifiers }) => ({ ...state, modifiers }),
};

const documentReducer = createReducer(handlers, initialState);

export default documentReducer;
