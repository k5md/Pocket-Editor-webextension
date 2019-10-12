import React from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import FontPicker from '../FontPicker';
import FontSizePicker from '../FontSizePicker';
import { connect } from 'react-redux';
import { retrieveModifiers } from '../../actions/editorActions';

const Toolbar = ({
  font,
  fontSize,
  italic,
  bold,
  underline,
  strikethrough,
  ordered,
  unordered,
  justify,
  retrieveModifiers,
}) => (
  <div>
    <ButtonGroup className="commandGroup">
      <FontPicker
        font={font}
        onSelect={font => retrieveModifiers('font', font)}
      />
      <FontSizePicker
        fontSize={fontSize}
        onSelect={fontSize => retrieveModifiers('fontSize', fontSize)}
      />
    </ButtonGroup>
    <ButtonGroup className="commandGroup">
      <Button icon='bold' active={bold} onClick={() => retrieveModifiers('bold', !bold)} onmousedown={(e) => e.preventDefault()} />
      <Button icon='underline' active={underline} onClick={() => retrieveModifiers('underline', !underline)} onmousedown={(e) => e.preventDefault()} />
      <Button icon='italic' active={italic} onClick={() => retrieveModifiers('italic', !italic)} onmousedown={(e) => e.preventDefault()} />
      <Button icon='strikethrough' active={strikethrough} onClick={() => retrieveModifiers('strikethrough', !strikethrough)} onmousedown={(e) => e.preventDefault()} />
    </ButtonGroup>
    <ButtonGroup className="commandGroup">
      <Button icon='numbered-list' active={ordered} onClick={() => retrieveModifiers('ordered', !ordered)} onmousedown={(e) => e.preventDefault()} />
      <Button icon='properties' active={unordered} onClick={() => retrieveModifiers('unordered', !unordered)} onmousedown={(e) => e.preventDefault()} />
    </ButtonGroup>
    <ButtonGroup className="commandGroup">
      <Button
        icon='align-left'
        active={justify === 'left'}
        onClick={() => retrieveModifiers('justify', justify === 'left' ? null : 'left')}
        onmousedown={(e) => e.preventDefault()} />
      <Button
        icon='align-center'
        active={justify === 'center'}
        onClick={() => retrieveModifiers('justify', justify === 'center' ? null : 'center')}
        onmousedown={(e) => e.preventDefault()}
      />
      <Button
        icon='align-right'
        active={justify === 'right'}
        onClick={() => retrieveModifiers('justify', justify === 'right' ? null : 'right')}
        onmousedown={(e) => e.preventDefault()}
      />
      <Button
        icon='align-justify'
        active={justify === 'full'}
        onClick={() => retrieveModifiers('justify', justify === 'full' ? null : 'full')}
        onmousedown={(e) => e.preventDefault()}
      />
    </ButtonGroup>
    <ButtonGroup className="commandGroup">
      <Button icon='undo' onClick={() => retrieveModifiers('undo')} onmousedown={(e) => e.preventDefault()} />
      <Button icon='redo' onClick={() => retrieveModifiers('redo')} onmousedown={(e) => e.preventDefault()} />
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
  retrieveModifiers: (command, value) => dispatch(retrieveModifiers(command, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
