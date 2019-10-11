import React, { Component } from 'react';
import { Button, ButtonGroup, Divider, } from '@blueprintjs/core';
import { uniqueId } from 'lodash';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import FontPicker from '../FontPicker';
import FontSizePicker from '../FontSizePicker';
import { connect } from 'react-redux';
import { retrieveModifiers } from '../../actions/editorActions';
import { isUndefined, isNaN, omitBy } from 'lodash';

class Toolbar extends Component {
  render() {
    const {
      italic,
      bold,
      underlined,
      strikethrough,
      ordered,
      unordered,
      justifyLeft,
      justifyCenter,
      justifyRight,
      justifyFull,
      retrieveModifiers,
    } = this.props;

    return (
        <ButtonGroup className="commandGroup">
          <FontPicker />
          <FontSizePicker />
          <Button icon='bold' active={bold} onClick={(e) => retrieveModifiers('bold', !bold)} onmousedown={(e) => e.preventDefault()} />
          <Button icon='underline' active={underlined} onClick={(e) => retrieveModifiers('underline', !underlined)} onmousedown={(e) => e.preventDefault()} />
          <Button icon='italic' active={italic} onClick={(e) => retrieveModifiers('italic', !italic)} onmousedown={(e) => e.preventDefault()} />
          <Button icon='strikethrough' active={strikethrough} onClick={(e) => retrieveModifiers('strikeThrough', !strikethrough)} onmousedown={(e) => e.preventDefault()} />
          <Button icon='numbered-list' active={ordered} onClick={(e) => retrieveModifiers('insertOrderedList', !ordered)} onmousedown={(e) => e.preventDefault()} />
          <Button icon='properties' active={unordered} onClick={(e) => retrieveModifiers('insertUnorderedList', !unordered)} onmousedown={(e) => e.preventDefault()} />
          <Button icon='align-left' active={justifyLeft} onClick={(e) => retrieveModifiers('justifyLeft', !justifyLeft)} onmousedown={(e) => e.preventDefault()} />
          <Button icon='align-center' active={justifyCenter} onClick={(e) => retrieveModifiers('justifyCenter', !justifyCenter)} onmousedown={(e) => e.preventDefault()} />
          <Button icon='align-right' active={justifyRight} onClick={(e) => retrieveModifiers('justifyRight', !justifyRight)} onmousedown={(e) => e.preventDefault()} />
          <Button icon='align-justify' active={justifyFull} onClick={(e) => retrieveModifiers('justifyFull', !justifyFull)} onmousedown={(e) => e.preventDefault()} />
          <Button icon='redo' onClick={(e) => retrieveModifiers('redo')} onmousedown={(e) => e.preventDefault()} />
          <Button icon='undo' onClick={(e) => retrieveModifiers('undo')} onmousedown={(e) => e.preventDefault()} />
        </ButtonGroup>
    );
  }
}


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


