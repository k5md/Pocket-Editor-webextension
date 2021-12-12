import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { collectModifiersFromSelection } from '../../../utils';
import * as classes from './styles.scss';

const DocumentItem = ({
  documentId,
  content: storedContent,
  saveDocument,
  setModifiers,
  active,
}) => {
  const editableAreaRef = useRef();

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

  const focusEditable = () => {
    if (!editableAreaRef.current) return;
    editableAreaRef.current.focus();
  };

  // focus editable area on active (without preserving last caret position)
  useEffect(() => {
    if (!active || !editableAreaRef.current) return;
    const timeout = setTimeout(() => {
      if (!editableAreaRef.current) return;
      editableAreaRef.current.focus();
    }, 300); // quick workaround for https://stackoverflow.com/questions/26782998/why-does-calling-focus-break-my-css-transition
    return () => clearTimeout(timeout); // eslint-disable-line consistent-return
  }, [active]);

  return (
    <Card elevation={Elevation.TWO} className={classes.editableContainer} onClick={focusEditable}>
      <div
        ref={editableAreaRef}
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
