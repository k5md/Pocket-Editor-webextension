import React from "react";
import { Card, AnchorButton, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import cn from 'classnames';

import * as classes from './styles.scss';

export const PanelList = ({
  children,
  left,
  right,
  center,
  onTabChange = () => ({}),
}) => (
  <div className={classes.container}>
    <div className={classes.controls}>
      <div className={cn(
        classes.control,
        classes.left,
      )}>
        <AnchorButton minimal small>
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
      <div className={cn(
        classes.control,
        classes.right,
      )}>
        {right && <div className={classes.rightInner}>{right}</div>}
        <AnchorButton minimal small>
          <Icon icon={IconNames.ARROW_RIGHT} />
        </AnchorButton>
      </div>
    </div>
    <Card renderActiveTabPanelOnly onChange={onTabChange} className={classes.tabs}>
      {children.map(child => (<Card panel={child} key={child.key} className={classes.tab}/>))}
    </Card>
  </div>
);
