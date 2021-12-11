import React, { useState, useEffect, useRef } from 'react';
import { Overlay } from '@blueprintjs/core';
import * as classes from './styles.scss';

const EditableText = ({
  value,
  onChange,
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => () => {
    setEditing(false);
  }, []);

  if (!editing) {
    return (
      <p className={classes.ellipsized} onClick={() => setEditing(true)}>
        {value}
      </p>
    );
  }

  // autofocus on mount
  // NOTE: nope, regular autofocus attribute won't work since we're using blueprintjs focusManager
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Overlay
      isOpen={editing}
      onClose={() => setEditing(false)}
      usePortal={false}
    >
      <p className={classes.inputContainer}>
        <input
          ref={inputRef}
          onBlur={() => setEditing(false)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </p>
    </Overlay>
  );
};

export default EditableText;
