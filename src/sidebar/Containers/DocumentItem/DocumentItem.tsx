import React, { useRef, useEffect } from "react";
import { connect } from 'react-redux';
import { retrieveModifiers, setDocumentRef, saveDocument } from '../../actions/editorActions';
import { Card, Elevation } from '@blueprintjs/core';

import * as classes from './styles.scss';

const DocumentItem = ({
  content,
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
