import React, { useState, useEffect } from "react";
import { Card, AnchorButton, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import cn from 'classnames';

import * as classes from './styles.scss';

export const PanelControls = ({
  activateNext,
  activatePrev,
  nextAvailable,
  prevAvailable,
  activeIndex,
  items,
  renderCaption = (item) => item.props.title,
}) => {
  const captions = {
    left: prevAvailable && renderCaption(items[activeIndex - 1]),
    center: renderCaption(items[activeIndex]),
    right: nextAvailable && renderCaption(items[activeIndex + 1]),
  };

  console.log(items);

  return (
    <div className={classes.controls}>
      <div className={cn([
        classes.control,
        classes.left,
        !prevAvailable && classes.hidden,
      ])}>
        <AnchorButton minimal small onClick={activatePrev}>
          <Icon icon={IconNames.ARROW_LEFT} />
        </AnchorButton>
        {captions.left && <div className={classes.leftInner}>{captions.left}</div>}
      </div>
      <div className={cn(
        classes.control,
        classes.center,
      )}>
        {captions.center && <div className={classes.centerInner}>{captions.center}</div>}
      </div>
      <div className={cn([
        classes.control,
        classes.right,
        !nextAvailable && classes.hidden,
      ])}>

        <AnchorButton minimal small onClick={activateNext}>
          <Icon icon={IconNames.ARROW_RIGHT} />
        </AnchorButton>
        {captions.right && <div className={classes.rightInner}>{captions.right}</div>}
      </div>
    </div>
  );
};
