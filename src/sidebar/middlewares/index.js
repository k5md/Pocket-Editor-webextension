import thunk from 'redux-thunk';
import throttle from './throttle';

const middlewares = [
  thunk,
  throttle,
];

if (!PRODUCTION) {
  // eslint-disable-next-line global-require
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export default middlewares;
