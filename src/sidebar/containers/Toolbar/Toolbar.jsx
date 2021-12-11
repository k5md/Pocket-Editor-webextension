import React, { useCallback } from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { mutateDocumentWithModifiers, getContent } from '../../../utils';
import * as classes from './styles.scss';

const Toolbar = ({
  modifiers,
  setModifiers,
  saveDocument,
  documentId,
}) => {
  const {
    italic,
    bold,
    underline,
    strikethrough,
    ordered,
    unordered,
    justify,
  } = modifiers;

  const modifyDocument = (command, value) => {
    const { change } = mutateDocumentWithModifiers(command, value);

    const newModifiers = { ...modifiers, ...change };
    setModifiers(newModifiers);

    const content = getContent(documentId);
    saveDocument(content);
  };

  if (!documentId) {
    return null;
  }

  // NOTE: preventDefault everywhere so that focus (cursor place) on contentEditable
  // is not lost as soon as the button is clicked
  const preventDefault = useCallback((e) => e.preventDefault(), []);

  return (
    <div className={classes.toolbar}>
      <ButtonGroup className={classes.commandGroup}>
        <Button
          icon='bold'
          active={bold}
          onClick={() => modifyDocument('bold', !bold)}
          onMouseDown={preventDefault}
        />
        <Button
          icon='underline'
          active={underline}
          onClick={() => modifyDocument('underline', !underline)}
          onMouseDown={preventDefault}
        />
        <Button
          icon='italic'
          active={italic}
          onClick={() => modifyDocument('italic', !italic)}
          onMouseDown={preventDefault}
        />
        <Button
          icon='strikethrough'
          active={strikethrough}
          onClick={() => modifyDocument('strikethrough', !strikethrough)}
          onMouseDown={preventDefault}
        />
      </ButtonGroup>
      <ButtonGroup className={classes.commandGroup}>
        <Button
          icon='align-left'
          active={justify === 'left'}
          onClick={() => modifyDocument('justifyLeft')}
          onMouseDown={preventDefault}
        />
        <Button
          icon='align-center'
          active={justify === 'center'}
          onClick={() => modifyDocument('justifyCenter')}
          onMouseDown={preventDefault}
        />
        <Button
          icon='align-right'
          active={justify === 'right'}
          onClick={() => modifyDocument('justifyRight')}
          onMouseDown={preventDefault}
        />
        <Button
          icon='align-justify'
          active={justify === 'full'}
          onClick={() => modifyDocument('justifyFull')}
          onMouseDown={preventDefault}
        />
      </ButtonGroup>
      <ButtonGroup className={classes.commandGroup}>
        <Button
          icon='numbered-list'
          active={ordered}
          onClick={() => modifyDocument('ordered', !ordered)}
          onMouseDown={preventDefault}
        />
        <Button
          icon='properties'
          active={unordered}
          onClick={() => modifyDocument('unordered', !unordered)}
          onMouseDown={preventDefault}
        />
      </ButtonGroup>
      <ButtonGroup className={classes.commandGroup}>
        <Button
          icon='undo'
          onClick={() => modifyDocument('undo')}
          onMouseDown={preventDefault}
        />
        <Button
          icon='redo'
          onClick={() => modifyDocument('redo')}
          onMouseDown={preventDefault}
        />
      </ButtonGroup>
    </div>
  );
};

export default Toolbar;
