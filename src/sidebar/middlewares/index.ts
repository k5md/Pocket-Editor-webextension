import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const middlewares = [
  thunk,
  logger,
];

export default middlewares;
