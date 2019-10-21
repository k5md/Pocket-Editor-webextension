import React from "react";
import { uniqueId } from 'lodash';
import { AnchorButton, Portal } from '@blueprintjs/core';

import * as classes from './styles.scss';

export const FileInput = ({
  onInputChange,
  label,
  inputProps,
  ...containerProps,
}) => {
  const id = uniqueId();
  // NOTE: use portal here to cover the case when fileInput is being used in popover children
  return (
    <div {...containerProps}>
      <AnchorButton minimal className={classes.inputContainer}>
        <Portal>
          <input type="file" id={id} className={classes.inputElement} onChange={onInputChange} {...inputProps}/>
        </Portal>
        <label for={id}>{label}</label>
      </AnchorButton>
    </div>
  );
};
