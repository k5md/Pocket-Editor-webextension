import React, { useState, useEffect } from 'react';
import * as classes from './styles.scss';

const Item = ({
  children,
  active,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(!animate && active));
  }, [active]);

  return (
    <div className={[
      classes.container,
      classes.fade,
      animate ? classes.in : classes.out,
    ].join(' ')}>
      {active && children}
    </div>
  );
};

export default Item;
