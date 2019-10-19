import React, { useState } from "react";
import { Card, AnchorButton, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import cn from 'classnames';

import * as classes from './styles.scss';

export const PanelList = ({
  children,
  onActiveChange,
}) => {
  const [ activePanel, setActivePanel ] = useState(0);
  const prevAvailable = activePanel - 1 >= 0;
  const nextAvailable = activePanel + 1 < children.length;
  const activatePrev = () => {
    if (!prevAvailable) return;
    if (onActiveChange) onActiveChange(activePanel, activePanel - 1);
    return setActivePanel(activePanel - 1);
  };
  const activateNext = () => {
    if (!nextAvailable) return;
    if (onActiveChange) onActiveChange(activePanel, activePanel + 1);
    return setActivePanel(activePanel + 1);
  }

  const left = prevAvailable && children[activePanel - 1].props.title;
  const center = children[activePanel].props.title;
  const right = nextAvailable && children[activePanel + 1].props.title;

  return (
    <div className={classes.container}>
      <div className={classes.panel}>
        {children[activePanel]}
      </div>
      <div className={classes.controls}>
        <div className={cn([
          classes.control,
          classes.left,
          !prevAvailable && classes.hidden,
        ])}>
          <AnchorButton minimal small onClick={activatePrev}>
            <Icon icon={IconNames.ARROW_LEFT} />
          </AnchorButton>
          {left && <div className={classes.leftInner}>{left}</div>}
        </div>
        <div className={cn(
          classes.control,
          classes.center,
        )}>
          {center && <div className={classes.centerInner}>{center}</div>}
        </div>
        <div className={cn([
          classes.control,
          classes.right,
          !nextAvailable && classes.hidden,
        ])}>
          {right && <div className={classes.rightInner}>{right}</div>}
          <AnchorButton minimal small onClick={activateNext}>
            <Icon icon={IconNames.ARROW_RIGHT} />
          </AnchorButton>
        </div>
      </div>
    </div>
  );
};
