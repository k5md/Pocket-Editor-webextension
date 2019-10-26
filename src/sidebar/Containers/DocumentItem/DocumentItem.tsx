import React, { useState, useEffect } from "react";
import { Card, Elevation } from '@blueprintjs/core';
import { collectModifiersFromSelection } from '../../../utils';
import * as classes from './styles.scss';

const DocumentItem = ({
  content: storedContent,
  updateModifiers,
  saveDocument,
  id,
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

    const selection = window.getSelection();
    if (!selection.rangeCount) return false;

    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    selection.collapseToEnd();
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
        id={id}
        contentEditable="true"
        dangerouslySetInnerHTML={({ __html: content })}
      />
    </Card>
  );
};

export default DocumentItem;
