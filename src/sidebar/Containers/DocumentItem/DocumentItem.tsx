import React, { useRef, useState, useEffect } from "react";
import { connect } from 'react-redux';
import { retrieveModifiers, setDocumentRef, saveDocument } from '../../actions/editorActions';
import { Card, Elevation } from '@blueprintjs/core';

import * as classes from './styles.scss';

function saveSelection() {
    if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(range) {
  console.log(range);
    if (range) {
        if (window.getSelection) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
}

const DocumentItem = ({
  content: initialContent,
  retrieveModifiers,
  setDocumentRef,
  saveDocument,
}) => {
  const editableAreaRef = useRef(null);
  useEffect(() => {
    setDocumentRef(editableAreaRef.current);
    return () => setDocumentRef(null);
  }, []);

  const onSelectableChange = () => {
    return retrieveModifiers();
  };

  const [ up, setUp ] = useState(false);
  const [ selection, setSelection ] = useState(null);
  const [ content ] = useState(initialContent);

  if (selection) {
    if (up) {
      console.log(selection);
      restoreSelection(selection);
      setSelection(null);   
      setUp(false);
    }
  }

  const onPaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text');

    const selection = window.getSelection();
    if (!selection.rangeCount) return false;

    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(paste));

    event.preventDefault();
  };

  return (
    <Card elevation={Elevation.TWO} className={classes.editableArea}>           
      <div
        ref={editableAreaRef}
        onClick={onSelectableChange}
        onPaste={onPaste}
        onKeyUp={() => { setSelection(saveSelection()); setUp(true); saveDocument(); }}
        contentEditable="true"
        dangerouslySetInnerHTML={({ __html: content })}
      />
    </Card>
  );
};

const mapStateToProps = ({ editorReducer }) => ({
  content: editorReducer.documents[editorReducer.currentDocument].content
});

const mapDispatchToProps = (dispatch) => ({
  retrieveModifiers: () => dispatch(retrieveModifiers()),
  setDocumentRef: (ref) => dispatch(setDocumentRef(ref)),
  saveDocument: () => dispatch(saveDocument()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentItem);
