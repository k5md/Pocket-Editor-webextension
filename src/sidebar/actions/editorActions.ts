import * as types from '../constants/actionTypes';

export const setCursorPosition = (cursorPosition) => ({
  type: types.SET_CURSOR_POSITION,
  cursorPosition,
});

export const setModifiers = (modifiers) => ({
  type: types.SET_MODIFIERS,
  modifiers,
});
