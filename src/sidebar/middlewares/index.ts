import thunk from 'redux-thunk';
import throttle from './throttle';

const middlewares = [
  thunk,
  throttle,
];

if (!PRODUCTION) {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export default middlewares;
