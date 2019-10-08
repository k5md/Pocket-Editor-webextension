import {
	createStore,
	combineReducers,
	applyMiddleware,
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const configureStore = () => {
	const rootReducer = combineReducers(reducers);
  const middlewares = [
    logger,
    thunk,
  ];
	const store = createStore(rootReducer, applyMiddleware(...middlewares));

	return { store };
};

export { configureStore };
