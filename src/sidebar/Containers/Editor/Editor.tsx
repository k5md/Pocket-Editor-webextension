import React, { Component } from 'react';

import Toolbar from '../Toolbar';
import Menubar from '../Menubar';
import DocumentList from '../DocumentList';

import { connect } from 'react-redux';
import * as classes from './styles.scss';

class Editor extends Component {


  render() {
    return (
      <div className={classes.editor}>
        <Menubar />
        <Toolbar/>
        <DocumentList/>
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
