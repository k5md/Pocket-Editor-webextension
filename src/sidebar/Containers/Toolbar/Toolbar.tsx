import React from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { setModifiers } from '../../actions/editorActions';

import * as classes from './styles.scss';

const Toolbar = ({
  italic,
  bold,
  underline,
  strikethrough,
  ordered,
  unordered,
  justify,
  setModifiers,
}) => (
  <div className={classes.toolbar}>
    <ButtonGroup className={classes.commandGroup}>
      <Button icon='bold' active={bold} onClick={() => setModifiers('bold', !bold)} onmousedown={(e) => e.preventDefault()} />
      <Button icon='underline' active={underline} onClick={() => setModifiers('underline', !underline)} onmousedown={(e) => e.preventDefault()} />
      <Button icon='italic' active={italic} onClick={() => setModifiers('italic', !italic)} onmousedown={(e) => e.preventDefault()} />
      <Button icon='strikethrough' active={strikethrough} onClick={() => setModifiers('strikethrough', !strikethrough)} onmousedown={(e) => e.preventDefault()} />
    </ButtonGroup>
    <ButtonGroup className={classes.commandGroup}>
      <Button
        icon='align-left'
        active={justify === 'left'}
        onClick={() => setModifiers('justify', justify === 'left' ? null : 'left')}
        onmousedown={(e) => e.preventDefault()} />
      <Button
        icon='align-center'
        active={justify === 'center'}
        onClick={() => setModifiers('justify', justify === 'center' ? null : 'center')}
        onmousedown={(e) => e.preventDefault()}
      />
      <Button
        icon='align-right'
        active={justify === 'right'}
        onClick={() => setModifiers('justify', justify === 'right' ? null : 'right')}
        onmousedown={(e) => e.preventDefault()}
      />
      <Button
        icon='align-justify'
        active={justify === 'full'}
        onClick={() => setModifiers('justify', justify === 'full' ? null : 'full')}
        onmousedown={(e) => e.preventDefault()}
      />
    </ButtonGroup>
    <ButtonGroup className={classes.commandGroup}>
      <Button icon='numbered-list' active={ordered} onClick={() => setModifiers('ordered', !ordered)} onmousedown={(e) => e.preventDefault()} />
      <Button icon='properties' active={unordered} onClick={() => setModifiers('unordered', !unordered)} onmousedown={(e) => e.preventDefault()} />
    </ButtonGroup>
    <ButtonGroup className={classes.commandGroup}>
      <Button icon='undo' onClick={() => setModifiers('undo')} onmousedown={(e) => e.preventDefault()} />
      <Button icon='redo' onClick={() => setModifiers('redo')} onmousedown={(e) => e.preventDefault()} />
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
  setModifiers: (command, value) => dispatch(setModifiers(command, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
