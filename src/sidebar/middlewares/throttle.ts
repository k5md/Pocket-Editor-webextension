import { hasIn } from 'lodash';

const throttled = {};

const throttle = store => next => (action) => {
  if (!hasIn(action, 'meta.throttle')) return next(action);

  if (throttled[action.type]) return;

  const { time } = action.meta;

  throttled[action.type] = true;
  setTimeout(() => {
    throttled[action.type] = false;
  }, time);

  next(action);
};

export default throttle;
