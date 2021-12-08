import React, { useState, useEffect } from "react";
import { Card, Elevation } from '@blueprintjs/core';
import { collectModifiersFromSelection } from '../../../utils';
import * as classes from './styles.scss';

type Props = {
  documentId: string,
  content: string,
  saveDocument: (arg0: string) => void,
  setModifiers: (arg0: object) => void,
  title?: string,
};

const DocumentItem: React.FC<Props> = ({
  documentId,
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
    const paste = e.clipboardData.getData('Text');
    document.execCommand('insertText', false, paste);
    e.preventDefault();
    saveDocument(e.target.innerHTML);
  };

  const onKeyUp = (e) => {
    updateModifiers(e);
    saveDocument(e.target.innerHTML);
  };

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
