import logger from 'redux-logger';
import thunk from 'redux-thunk';
import documentUpdater from './documentUpdater';

export const middlewares = [
  logger,
  thunk,
  documentUpdater,
];

export default middlewares;
