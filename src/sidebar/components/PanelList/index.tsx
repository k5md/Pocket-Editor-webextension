import React, { useState, useMemo, useEffect } from "react";
import { PanelItem } from '../';
import { usePrevious } from '../../hooks';
import * as classes from './styles.scss';

export const PanelList = ({
  items,
  activeIndex,
}) => {
  const previousActiveIndex = usePrevious(activeIndex);
  
  const [ scroll, setScroll ] = useState(0);

  useEffect(() => {
    const offset = previousActiveIndex === undefined ? -1 * activeIndex : previousActiveIndex - activeIndex;
    setScroll(scroll + 100 * offset);
  }, [ activeIndex ]);
  
  const scrollStyle = {
    transform: `translateX(${scroll}%)`,
    transition: 'transform 200ms linear 0ms',
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
