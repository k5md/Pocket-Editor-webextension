import React, { useState, useEffect } from "react";
import { Card, Elevation } from '@blueprintjs/core';
import { collectModifiersFromSelection } from '../../../utils';
import * as classes from './styles.scss';

const DocumentItem = ({
  content: storedContent,
  saveDocument,
  setModifiers,
}) => {
  const [ content ] = useState(storedContent);

  const updateModifiers = (e) => {
    const modifiers = collectModifiersFromSelection(e.target);
    setModifiers(modifiers);
  };

  // reset toolbar state on mount
  useEffect(() => {
    setModifiers({});
  }, []);

  const onPaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('Text');
    document.execCommand('insertText', false, paste);
    event.preventDefault();
    saveDocument(e.target.innerHTML);
  };

  const onKeyUp = (e) => {
    updateModifiers(e);
    saveDocument(e.target.innerHTML);
  };

  return (
    <Card elevation={Elevation.TWO} className={classes.editableArea}>           
      <div
        onClick={updateModifiers}
        onPaste={onPaste}
        onKeyUp={onKeyUp}
        contentEditable="true"
        dangerouslySetInnerHTML={({ __html: content })}
      />
    </Card>
  );
};

export default DocumentItem;
