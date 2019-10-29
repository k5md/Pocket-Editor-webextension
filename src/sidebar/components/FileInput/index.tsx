import React, { useState, useRef } from "react";
import { uniqueId } from 'lodash';
import { AnchorButton, Portal } from '@blueprintjs/core';

import * as classes from './styles.scss';

export const FileInput = ({
  onInputChange,
  label,
  inputProps = {},
  ...containerProps
}) => {
  const [ id ] = useState(() => uniqueId());
  const inputRef = useRef(null);

  // NOTE: use portal here to cover the case when fileInput is being used in popover children
  return (
    <div {...containerProps}>
      <AnchorButton minimal text={label} onClick={() => inputRef.current.click()}>
        <Portal>
          <input
            ref={inputRef}
            type="file"
            id={id}
            className={classes.inputElement}
            onChange={onInputChange}
            {...inputProps}
          />
        </Portal>   
      </AnchorButton>
    </div>
  );
};
