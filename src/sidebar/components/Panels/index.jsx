import React, { useCallback, useMemo } from "react";

import { PanelList } from '../';
import { PanelControls } from '../';
import * as classes from './styles.scss';

export const Panels = ({
  children: items,
  activeIndex,
  onActiveChange,
  renderCaption = (item) => item.props.title,
}) => {
  if (!items.length) {
    return null;
  }

  const prevAvailable = useMemo(() => activeIndex - 1 >= 0, [activeIndex]);
  const nextAvailable = useMemo(() => activeIndex + 1 < items.length, [activeIndex, items.length]);

  const activatePrev = useCallback(() => {
    if (!prevAvailable) return;
    onActiveChange(activeIndex - 1, activeIndex);
  }, [onActiveChange, activeIndex, prevAvailable]);

  const activateNext = useCallback(() => {
    if (!nextAvailable) return;
    onActiveChange(activeIndex + 1, activeIndex);
  }, [onActiveChange, activeIndex, nextAvailable]);

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
