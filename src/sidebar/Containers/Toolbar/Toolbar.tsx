import React from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { modifyDocument } from '../../actions/editorActions';

import * as classes from './styles.scss';

const Toolbar = ({
  italic,
  bold,
  underline,
  strikethrough,
  ordered,
  unordered,
  justify,
  modifyDocument,
}) => (
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
        onClick={() => modifyDocument('justify', justify === 'left' ? null : 'left')}
        onmousedown={(e) => e.preventDefault()} />
      <Button
        icon='align-center'
        active={justify === 'center'}
        onClick={() => modifyDocument('justify', justify === 'center' ? null : 'center')}
        onmousedown={(e) => e.preventDefault()}
      />
      <Button
        icon='align-right'
        active={justify === 'right'}
        onClick={() => modifyDocument('justify', justify === 'right' ? null : 'right')}
        onmousedown={(e) => e.preventDefault()}
      />
      <Button
        icon='align-justify'
        active={justify === 'full'}
        onClick={() => modifyDocument('justify', justify === 'full' ? null : 'full')}
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

const mapStateToProps = ({ editorReducer }) => {
  const { modifiers } = editorReducer;
  return {
    ...modifiers,
  };
}

const mapDispatchToProps = (dispatch) => ({
  modifyDocument: (command, value) => dispatch(modifyDocument(command, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
