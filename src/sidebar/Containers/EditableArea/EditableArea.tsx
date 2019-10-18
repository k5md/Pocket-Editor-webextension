import React, { useRef } from "react";
import { connect } from 'react-redux';
import { getModifiers } from '../../actions/editorActions';
import { Card, Elevation } from '@blueprintjs/core';

import * as classes from './styles.scss';

const EditableArea = ({
  content,
  getModifiers,
}) => {
  const editableAreaRef = useRef(null);
  const onSelectableChange = () => {
    return getModifiers(editableAreaRef);
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
  getModifiers: (ref) => dispatch(getModifiers(ref)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditableArea);
