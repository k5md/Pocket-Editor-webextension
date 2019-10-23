import React, { useEffect, useState } from "react";

import { PanelList } from '../';
import { PanelControls } from '../';
import * as classes from './styles.scss';

export const Panels = ({
  children: items,
  activeIndex,
  onActiveChange,
}) => {
  const prevAvailable = activeIndex - 1 >= 0;
  const nextAvailable = activeIndex + 1 < items.length;

  const activatePrev = () => {
    if (!prevAvailable) return;
    onActiveChange(activeIndex, activeIndex - 1);
  };

  const activateNext = () => {
    if (!nextAvailable) return;
    onActiveChange(activeIndex, activeIndex + 1);
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
