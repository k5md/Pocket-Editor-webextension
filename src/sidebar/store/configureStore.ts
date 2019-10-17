import {
	createStore,
	combineReducers,
	applyMiddleware,
} from 'redux';
import reducers from '../reducers';
import middlewares from '../middlewares';

const configureStore = () => {
	const rootReducer = combineReducers(reducers);
	const store = createStore(rootReducer, applyMiddleware(...middlewares));

	return { store };
};

export { configureStore };
