import React, { useState } from "react";
import { connect } from 'react-redux';
import { IconNames } from "@blueprintjs/icons";

import DocumentItem from '../DocumentItem';
import { Panels } from '../../components';
import { setActiveDocument } from '../../actions/editorActions';

const DocumentList = ({
  documents,
  setActiveDocument,
  activeDocument,
}) => (
  <Panels
    onActiveChange={(prevIdx, curIdx) => setActiveDocument(curIdx)}
    activeIndex={activeDocument}
  >
    {documents.map(({ title, content, id }) => <DocumentItem key={id} title={title} content={content} />)}
  </Panels>
);

const mapStateToProps = ({ editorReducer }) => ({
  documents: editorReducer.documents,
  activeDocument: editorReducer.currentDocument,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveDocument: index => dispatch(setActiveDocument(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
