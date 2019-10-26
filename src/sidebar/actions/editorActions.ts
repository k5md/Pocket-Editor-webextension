import * as types from '../constants/actionTypes';
import * as extensions from '../../extensions';

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

export const saveDocument = (content) => ({
  type: types.SAVE_DOCUMENT,
  content,
});

export const deleteDocument = () => ({
  type: types.DELETE_DOCUMENT,
});

export const setCurrentDocument = (index) => ({
  type: types.SET_CURRENT_DOCUMENT,
  index,
});

export const setDocumentRef = (ref) => ({
  type: types.SET_DOCUMENT_REF,
  ref,
});

export const importDocument = (file) => (dispatch) => {
  dispatch({ type: types.IMPORT_DOCUMENT, file });

  const reader = new FileReader();
  reader.onload = async (fileContainer) => {
    try {
      const arrayBuffer = fileContainer.target.result;
      const extension = file.name.replace(/(.*)\.(.*?)$/, "$2");

      console.log(extensions, extension, extensions[extension]);
      if (!extensions[extension]) {
        throw new Error(`${extension} is not a supported file type`);
      }

      const html = await extensions[extension].toHTML(arrayBuffer);

      const document = {
        title: file.name.replace(/(.*)\.(.*?)$/, "$1"),
        content: html,
      };
      console.log(document);
      dispatch(importDocumentSuccess(document));
    } catch (error) {
      reader.abort();
      dispatch(importDocumentError(error));
    }
  };
  reader.onerror = (error) => {
    reader.abort();
    dispatch(importDocumentError(error));
  }
  reader.readAsArrayBuffer(file);
};

export const importDocumentSuccess = (document) => ({
  type: types.IMPORT_DOCUMENT_SUCCESS,
  document,
});

export const importDocumentError = (error) => ({
  type: types.IMPORT_DOCUMENT_ERROR,
  error,
});

export const exportDocument = (extension) => (dispatch, getState) => {
  dispatch({ type: types.EXPORT_DOCUMENT, extension });

  if (extensions[extension]) {
    const { documents, currentDocument } = getState().editorReducer;
    const { content, title } = documents[currentDocument];
    extensions[extension].fromHTML(content, title);
  }
  return Promise.resolve();
};

export const exportDocumentSuccess = () => ({
  type: types.EXPORT_DOCUMENT_SUCCESS,
});

export const exportDocumentError = (error) => ({
  type: types.EXPORT_DOCUMENT.ERROR,
  error,
});
