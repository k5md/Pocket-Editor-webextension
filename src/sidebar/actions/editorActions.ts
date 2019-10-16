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

export const newDocument = () => ({
  type: types.NEW_DOCUMENT,
});

export const deleteDocument = () => ({
  type: types.DELETE_DOCUMENT,
});

export const saveDocument = () => ({
  type: types.SAVE_DOCUMENT,
});

export const setDocument = () => ({
  type: types.SET_DOCUMENT,
});
