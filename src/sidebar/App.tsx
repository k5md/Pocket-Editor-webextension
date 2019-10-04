import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Editor from './Containers/Editor';

import { FocusStyleManager } from "@blueprintjs/core";
 
FocusStyleManager.onlyShowFocusOnTabs();


class App extends Component {
  render() {
    return (<Editor />);
  }
}

const mount = () => {
  const container = document.getElementById('container');
  ReactDOM.render(<App />, container);
};

export default mount;
