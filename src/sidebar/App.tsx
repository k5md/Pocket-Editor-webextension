import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Editor from './Containers/Editor';

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
