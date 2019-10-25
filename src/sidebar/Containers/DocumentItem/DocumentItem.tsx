import React, { useRef, useState, useEffect } from "react";
import { Card, Elevation } from '@blueprintjs/core';
import { saveSelection, restoreSelection, collectModifiersFromSelection } from '../../../utils';

import * as classes from './styles.scss';

const DocumentItem = ({
  content: initialContent,
  retrieveModifiers,
  setDocumentRef,
  saveDocument,
  id: identifier,
  setModifiers,
}) => {
  console.log(identifier, identifier)

  const editableAreaRef = useRef(null);
  useEffect(() => {
    setDocumentRef(editableAreaRef.current);
    return () => setDocumentRef(null);
  }, []);

  const [ up, setUp ] = useState(false);
  const [ selection, setSelection ] = useState(null);
  const [ content ] = useState(initialContent);

  console.log(identifier);
  useEffect(() => {
    console.log('mount', identifier);
    try {
      retrieveModifiers();
      setSelection(null);  

    } catch (e) { console.log(e)};
  }, [ identifier ]);

  if (selection && up) {
      restoreSelection(selection);
      setSelection(null);   
      setUp(false);
  }

  const onPaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('Text');

    const selection = window.getSelection();
    if (!selection.rangeCount) return false;

    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    selection.collapseToEnd();
    event.preventDefault();
    saveDocument();
  };

  const retrieveModifiers = () => {
    const modifiers = collectModifiersFromSelection(editableAreaRef.current);
    setModifiers(modifiers);
  };

  return (
    <Card elevation={Elevation.TWO} className={classes.editableArea}>           
      <div
        ref={editableAreaRef}
        onInput={retrieveModifiers}
        onClick={retrieveModifiers}
        onPaste={onPaste}
        onKeyUp={() => { setSelection(saveSelection()); setUp(true); saveDocument(); }}
        contentEditable="true"
        dangerouslySetInnerHTML={({ __html: content })}
      />
    </Card>
  );
};

export default DocumentItem;
