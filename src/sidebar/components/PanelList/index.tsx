import React, { useState, useMemo } from "react";
import { PanelItem } from '../';
import { usePrevious } from '../../hooks';
import * as classes from './styles.scss';

export const PanelList = ({
  items,
  activeIndex,
}) => {
  const previousActiveIndex = usePrevious(activeIndex);
  
  const [ scroll, setScroll ] = useState(0);

  const left = previousActiveIndex > activeIndex;
  const right = previousActiveIndex < activeIndex;

  if (left) setScroll(scroll + 100 * (previousActiveIndex - activeIndex));
  if (right) setScroll(scroll - 100 * (activeIndex - previousActiveIndex));

  const scrollStyle = {
    transform: `translateX(${scroll}%)`,
    transition: 'transform 300ms linear 0ms',
  };

  const itemRenderer = (item, index) => {
    return (
      <PanelItem active={activeIndex === index} key={item.key}>{item}</PanelItem>
    );
  };

  const renderedList = useMemo(() => items.map(itemRenderer), [ items ]);

  return (
    <div className={classes.listContainer}>
      <div className={classes.scrollWrapper} style={scrollStyle}>
        {renderedList}
      </div>
    </div>
  );
};
