import React from 'react';
import Toolbar from '../Toolbar';
import Menubar from '../Menubar';
import DocumentList from '../DocumentList';
import * as classes from './styles.scss';

const Editor = () => (
  <div className={classes.editor}>
    <Menubar />
    <Toolbar/>
    <DocumentList/>
  </div>
);

export default Editor;
