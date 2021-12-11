import hasIn from 'lodash/hasIn';

const throttled = {};

const throttle = () => (next) => (action) => {
  if (!hasIn(action, 'meta.throttle')) return next(action);

  if (throttled[action.type]) return null;

  const { time } = action.meta;

  throttled[action.type] = true;
  setTimeout(() => {
    throttled[action.type] = false;
  }, time);

  return next(action);
};

export default throttle;
