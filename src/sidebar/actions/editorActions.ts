import * as types from '../constants/actionTypes';

export const getModifiers = () => ({
  type: types.GET_MODIFIERS,
});

export const setModifiers = (command, value) => ({
  type: types.SET_MODIFIERS,
  command,
  value,
});

export const newDocument = () => ({
  type: types.NEW_DOCUMENT,
});

export const loadDocument = () => ({
  type: types.LOAD_DOCUMENT,
});

export const saveDocument = () => ({
  type: types.SAVE_DOCUMENT,
});

export const deleteDocument = () => ({
  type: types.DELETE_DOCUMENT,
});

export const importDocument = () => ({ 
  type: types.IMPORT_DOCUMENT,
});

export const exportDocument = () => ({
  type: types.EXPORT_DOCUMENT,
});
