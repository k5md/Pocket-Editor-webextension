import React, { useRef, useEffect } from "react";
import { connect } from 'react-redux';
import { retrieveModifiers, setDocumentRef } from '../../actions/editorActions';
import { Card, Elevation } from '@blueprintjs/core';

import * as classes from './styles.scss';

const DocumentItem = ({
  content,
  retrieveModifiers,
  setDocumentRef,
}) => {
  const editableAreaRef = useRef(null);
  useEffect(() => {
    setDocumentRef(editableAreaRef.current);
    return () => setDocumentRef(null);
  }, []);

  const onSelectableChange = () => {
    return retrieveModifiers();
  };

  return (
    <Card elevation={Elevation.TWO} className={classes.editableArea}>           
      <div
        ref={editableAreaRef}
        onClick={onSelectableChange}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentItem);
