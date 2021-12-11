import React, { useState, useEffect } from "react";
import { uniqueId } from 'lodash';
import { AnchorButton, Portal } from '@blueprintjs/core';

import * as classes from './styles.scss';

export const PanelItem = ({
  children,
  active,
}) => {
  const [ animate, setAnimate ] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(!animate && active));
  }, [ active ]);

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
