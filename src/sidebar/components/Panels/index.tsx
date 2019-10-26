import React, { useEffect, useState } from "react";

import { PanelList } from '../';
import { PanelControls } from '../';
import * as classes from './styles.scss';

export const Panels = ({
  children: items,
  activeIndex,
  onActiveChange,
}) => {
  if (!items.length) {
    return null;
  }

  const prevAvailable = activeIndex - 1 >= 0;
  const nextAvailable = activeIndex + 1 < items.length;

  const activatePrev = () => {
    if (!prevAvailable) return;
    onActiveChange(activeIndex - 1, activeIndex);
  };

  const activateNext = () => {
    if (!nextAvailable) return;
    onActiveChange(activeIndex + 1, activeIndex);
  };

  return (
    <div className={classes.container}>
      <PanelList items={items} activeIndex={activeIndex}/>
      <PanelControls
        activateNext={activateNext}
        activatePrev={activatePrev}
        nextAvailable={nextAvailable}
        prevAvailable={prevAvailable}
        items={items}
        activeIndex={activeIndex}
      />
    </div>
  );
};
