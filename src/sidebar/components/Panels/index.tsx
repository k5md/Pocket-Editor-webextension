import React, { useEffect, useState } from "react";

import { PanelList } from '../';
import { PanelControls } from '../';
import * as classes from './styles.scss';

type Props = {
  children: Array<React.ReactNode>,
  activeIndex: number,
  onActiveChange: (arg0: number, arg1: number) => void,
  renderCaption: Function,
}

export const Panels: React.FC<Props>= ({
  children: items,
  activeIndex,
  onActiveChange,
  renderCaption = (item) => item.props.title,
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
        renderCaption={renderCaption}
      />
    </div>
  );
};
