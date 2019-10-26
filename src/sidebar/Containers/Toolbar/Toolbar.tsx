import React from 'react';
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

  // NOTE: preventDefault everywhere so that focus on contentEditable is not lost
  return (
    <div className={classes.toolbar}>
      <ButtonGroup className={classes.commandGroup}>
        <Button icon='bold' active={bold} onClick={() => modifyDocument('bold', !bold)} onmousedown={(e) => e.preventDefault()} />
        <Button icon='underline' active={underline} onClick={() => modifyDocument('underline', !underline)} onmousedown={(e) => e.preventDefault()} />
        <Button icon='italic' active={italic} onClick={() => modifyDocument('italic', !italic)} onmousedown={(e) => e.preventDefault()} />
        <Button icon='strikethrough' active={strikethrough} onClick={() => modifyDocument('strikethrough', !strikethrough)} onmousedown={(e) => e.preventDefault()} />
      </ButtonGroup>
      <ButtonGroup className={classes.commandGroup}>
        <Button
          icon='align-left'
          active={justify === 'left'}
          onClick={() => modifyDocument('justifyLeft')}
          onmousedown={(e) => e.preventDefault()}
        />
        <Button
          icon='align-center'
          active={justify === 'center'}
          onClick={() => modifyDocument('justifyCenter')}
          onmousedown={(e) => e.preventDefault()}
        />
        <Button
          icon='align-right'
          active={justify === 'right'}
          onClick={() => modifyDocument('justifyRight')}
        />
        <Button
          icon='align-justify'
          active={justify === 'full'}
          onClick={() => modifyDocument('justifyFull')}
          onmousedown={(e) => e.preventDefault()}
        />
      </ButtonGroup>
      <ButtonGroup className={classes.commandGroup}>
        <Button icon='numbered-list' active={ordered} onClick={() => modifyDocument('ordered', !ordered)} onmousedown={(e) => e.preventDefault()} />
        <Button icon='properties' active={unordered} onClick={() => modifyDocument('unordered', !unordered)} onmousedown={(e) => e.preventDefault()} />
      </ButtonGroup>
      <ButtonGroup className={classes.commandGroup}>
        <Button icon='undo' onClick={() => modifyDocument('undo')} onmousedown={(e) => e.preventDefault()} />
        <Button icon='redo' onClick={() => modifyDocument('redo')} onmousedown={(e) => e.preventDefault()} />
      </ButtonGroup>
    </div>
  );
};

export default Toolbar;
