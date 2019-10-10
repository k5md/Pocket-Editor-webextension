import * as types from '../constants/actionTypes';

const initialState = {
  cursorPosition: 0,
  modifiers: {
    font: '',
    fontSize: 12,
    emphasis: {
      italic: false,
      bold: false,
      underlined: false,
      strikethrough: false,
    },
    list: {
      ordered: false,
      undordered: false,
    },
    justify: null, // left, center, right, full    
  },
};

const handlers = {
  [types.SET_CURSOR_POSITION]: (state, action) => {
    const { cursorPosition } = action;
    return {
      ...state,
      cursorPosition,
    };
  },
  [types.SET_MODIFIERS]: (state, action) => {
    const { modifiers } = action;
    return {
      ...state,
      modifiers,
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
