import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { FocusStyleManager } from '@blueprintjs/core';

import App from './App';
import { configureStore } from './store/configureStore';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

FocusStyleManager.onlyShowFocusOnTabs();

const { store } = configureStore();

const mount = () => {
  const container = document.getElementById('container');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    container,
  );
};

mount();
