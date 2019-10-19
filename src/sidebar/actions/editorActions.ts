import * as types from '../constants/actionTypes';

export const retrieveModifiers = () => ({
  type: types.RETRIEVE_MODIFIERS,
});

export const setModifiers = (modifiers) => ({
  type: types.SET_MODIFIERS,
  modifiers,
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

export const modifyDocument = (command, value) => ({
  type: types.MODIFY_DOCUMENT,
  command,
  value,
});

export const setDocumentRef = (ref) => ({
  type: types.SET_DOCUMENT_REF,
  ref,
});

export const importDocument = (file) => ({ 
  type: types.IMPORT_DOCUMENT,
  file,
});

export const importDocumentSuccess = (document) => ({
  type: types.IMPORT_DOCUMENT_SUCCESS,
  document,
});

export const importDocumentError = (error) => ({
  type: types.IMPORT_DOCUMENT_ERROR,
  error,
});

export const exportDocument = () => ({
  type: types.EXPORT_DOCUMENT,
});

export const exportDocumentSuccess = () => ({
  type: types.EXPORT_DOCUMENT_SUCCESS,
});

export const exportDocumentError = (error) => ({
  type: types.EXPORT_DOCUMENT.ERROR,
  error,
});
