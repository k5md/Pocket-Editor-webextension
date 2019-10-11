import * as types from '../constants/actionTypes';

export const retrieveModifiers = (command, value) => ({
  type: types.RETRIEVE_MODIFIERS,
  command,
  value,
});