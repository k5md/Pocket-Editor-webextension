/* eslint-disable import/no-duplicates */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { FocusStyleManager, Spinner } from '@blueprintjs/core';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import configureStore from './store/configureStore';

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

FocusStyleManager.onlyShowFocusOnTabs();

const { store, persistor } = configureStore();

const mount = () => {
  const container = document.getElementById('container');
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    container,
  );
};

mount();
