import * as types from '../constants/actionTypes';

const initialState = {
  cursorPosition: 0,
  font: null,
  fontSize: 0,
  emphasis: null, // italic, bold, underlined, strikethrough
  list: null, // ordered, undordered
  justify: null, // left, center, right, full
};

const handlers = {
  [types.SET_CURSOR_POSITION]: (state, action) => {
    const { cursorPosition } = action;
    return {
      ...state,
      cursorPosition,
    };
  },
};

const editorReducer = (state = initialState, action) => {
  if (!Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return state;
  }
  return handlers[action.type](state, action);
};

export default editorReducer;
