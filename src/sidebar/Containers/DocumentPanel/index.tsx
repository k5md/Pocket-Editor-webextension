import React, { useState } from "react";
import {
  Tab,
  Tabs,
  AnchorButton,
  Icon,
} from "@blueprintjs/core";
import { connect } from 'react-redux';
import { IconNames } from "@blueprintjs/icons";

import * as classes from './styles.scss';
import EditableArea from '../EditableArea';
import { PanelList } from '../../components';
import { setActiveDocument } from '../../actions/editorActions';

const DocumentStack = ({
  documents,
  setActiveDocument,
}) => (
  <PanelList onActiveChange={(prevIdx, curIdx) => setActiveDocument(curIdx)}>
    {documents.map(({ title, content }) => <EditableArea title={title} content={content}/>)}
  </PanelList>
);

const mapStateToProps = ({ editorReducer }) => ({
  documents: editorReducer.documents,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveDocument: index => dispatch(setActiveDocument(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentStack);
