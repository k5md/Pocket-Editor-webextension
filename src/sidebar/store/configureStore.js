import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createIdbStorage from '@piotr-cz/redux-persist-idb-storage';
import reducers from '../reducers';
import middlewares from '../middlewares';

const persistConfig = {
  key: 'root',
  storage: createIdbStorage({ name: 'pocketEditor', storeName: 'keyval' }),
  whitelist: ['editorReducer'],
  version: 1,
};

const configureStore = () => {
  const rootReducer = combineReducers(reducers);
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, applyMiddleware(...middlewares));

  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
