import logger from 'redux-logger';
import thunk from 'redux-thunk';
import documentUpdater from './documentUpdater';

export const middlewares = [
  thunk,
  documentUpdater,
  logger,
];

export default middlewares;
