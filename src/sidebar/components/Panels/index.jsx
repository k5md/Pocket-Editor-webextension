import React, { useCallback, useMemo } from 'react';
import List from './List';
import Controls from './Controls';
import * as classes from './styles.scss';

const Panels = ({
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
      <List items={items} activeIndex={activeIndex}/>
      <Controls
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

export default Panels;
