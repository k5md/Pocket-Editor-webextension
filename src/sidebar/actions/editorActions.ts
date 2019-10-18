import * as types from '../constants/actionTypes';

export const getModifiers = (ref) => ({
  type: types.GET_MODIFIERS,
  ref,
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

export const setActiveDocument = (index) => ({
  type: types.SET_ACTIVE_DOCUMENT,
  index,
});

export const importDocument = () => ({ 
  type: types.IMPORT_DOCUMENT,
});

export const exportDocument = () => ({
  type: types.EXPORT_DOCUMENT,
});
