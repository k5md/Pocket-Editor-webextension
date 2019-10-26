import logger from 'redux-logger';
import thunk from 'redux-thunk';
import throttle from './throttle';

export const middlewares = [
  thunk,
  throttle,
  logger,
];

export default middlewares;
