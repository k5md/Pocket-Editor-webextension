import React, { useState, useEffect, useCallback } from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { collectModifiersFromSelection } from '../../../utils';
import * as classes from './styles.scss';

const DocumentItem = ({
  documentId,
  content: storedContent,
  saveDocument,
  setModifiers,
}) => {
  const [content] = useState(storedContent);

  const updateModifiers = useCallback((e) => {
    const modifiers = collectModifiersFromSelection(e.target);
    setModifiers(modifiers);
  }, [collectModifiersFromSelection, setModifiers]);

  // reset toolbar state on mount
  useEffect(() => {
    setModifiers({});
  }, []);

  const onPaste = useCallback((e) => {
    const paste = e.clipboardData.getData('Text');
    document.execCommand('insertText', false, paste);
    e.preventDefault();
    saveDocument(e.target.innerHTML);
  }, [saveDocument]);

  const onKeyUp = useCallback((e) => {
    updateModifiers(e);
    saveDocument(e.target.innerHTML);
  }, [updateModifiers, saveDocument]);

  return (
    <Card elevation={Elevation.TWO} className={classes.editableArea}>
      <div
        id={documentId}
        onClick={updateModifiers}
        onPaste={onPaste}
        onKeyUp={onKeyUp}
        contentEditable
        dangerouslySetInnerHTML={({ __html: content })}
      />
    </Card>
  );
};

export default DocumentItem;
