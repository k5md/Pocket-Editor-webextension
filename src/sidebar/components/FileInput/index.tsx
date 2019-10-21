import React from "react";
import { uniqueId } from 'lodash';
import { AnchorButton } from '@blueprintjs/core';

import * as classes from './styles.scss';

export const FileInput = ({
  onInputChange,
  label,
}) => {
  const id = uniqueId();
  return (
    <AnchorButton minimal className={classes.inputContainer}>
      <input type="file" id={id} className={classes.inputElement} onInputChange={onInputChange} />
      <label for={id}>{label}</label>
    </AnchorButton>
  );
};
