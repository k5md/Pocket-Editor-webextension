import React, { Component } from 'react';

import Toolbar from '../Toolbar';
import EditableArea from '../EditableArea';
import Menubar from '../Menubar';

import { connect } from 'react-redux';
import { importDocument, exportDocument } from '../../actions/editorActions';
import './styles.scss';

class Editor extends Component {


  render() {
    return (
      <div className="editor">
        <Menubar />
        <Toolbar/>
        <EditableArea className="editableArea"/>
      </div>
    );
  }
}

const mapStateToProps = ({ editorReducer }) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
