import * as types from '../constants/actionTypes';

export const setModifiers = (command, value) => ({
  type: types.SET_MODIFIERS,
  command,
  value,
});

export const retrieveModifiers = (command, value) => ({
  type: types.RETRIEVE_MODIFIERS,
  command,
  value,
});

export const importDocument = () => ({
  type: types.IMPORT_DOCUMENT,
});

export const exportDocument = () => ({
  type: types.EXPORT_DOCUMENT,
});
