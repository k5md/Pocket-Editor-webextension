import React, { useMemo } from 'react';
import { AnchorButton } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import cn from 'classnames';
import * as classes from './styles.scss';

const Controls = ({
  activateNext,
  activatePrev,
  nextAvailable,
  prevAvailable,
  activeIndex,
  items,
  renderCaption,
}) => {
  const captions = useMemo(() => ({
    left: prevAvailable && renderCaption(items[activeIndex - 1], activeIndex - 1),
    center: renderCaption(items[activeIndex], activeIndex),
    right: nextAvailable && renderCaption(items[activeIndex + 1], activeIndex + 1),
  }), [prevAvailable, items, activeIndex, nextAvailable, renderCaption]);

  return (
    <div className={classes.controls}>
      <div className={cn([
        classes.control,
        classes.left,
        !prevAvailable && classes.hidden,
      ])}>
        <AnchorButton
          minimal
          small
          onClick={activatePrev}
          text={captions.left && <div className={classes.leftInner}>{captions.left}</div>}
          icon={IconNames.ARROW_LEFT}
        />
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
        <AnchorButton
          minimal
          small
          onClick={activateNext}
          text={captions.right && <div className={classes.rightInner}>{captions.right}</div>}
          rightIcon={IconNames.ARROW_RIGHT}
        />
      </div>
    </div>
  );
};

export default Controls;
