import React, { Component } from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import _ from 'lodash';
import ScrollMenu from 'react-horizontal-scrolling-menu';

const commands = [
  {
    cmd: 'bold',
    icon: 'bold',
  }, {
    cmd: 'underline',
    icon: 'underline',
  }, {
    cmd: 'italic',
    icon: 'italic',
  }, {
    cmd: 'strikeThrough',
    icon: 'strikethrough',
  }, {
    cmd: 'fontName',
    val: "'Inconsolata', monospace",
  }, {
    cmd: 'fontSize',
    val: '1-7',
    icon: 'text-height',
  }, {
    cmd: 'heading',
    val: 'h3',
    icon: 'header',
  }, {
    cmd: 'insertImage',
    val: 'http://dummyimage.com/160x90',
    icon: 'media',
  }, {
    cmd: 'insertOrderedList',
    icon: 'numbered-list',
  }, {
    cmd: 'insertUnorderedList',
    icon: 'properties',
  }, {
    cmd: 'insertParagraph',
    icon: 'paragraph',
  }, {
    cmd: 'justifyLeft',
    icon: 'align-left',
  }, {
    cmd: 'justifyCenter',
    icon: 'align-center',
  }, {
    cmd: 'justifyRight',
    icon: 'align-right',
  }, {
    cmd: 'justifyFull',
    icon: 'align-justify',
  }, {
    cmd: 'redo',
    icon: 'redo',
  }, {
    cmd: 'undo',
    icon: 'undo',
  }, 
];

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.commandRelation = {};
  }

  doCommand(action) {
    let { cmd, val } = action;
    if (this.supported(cmd) === 'btn-error') {
      alert('execCommand(“' + cmd + '”)\nis not supported in your browser');
      return;
    }
    val = (typeof val !== 'undefined') ? prompt('Value for ' + cmd + '?', val) : '';
    document.execCommand(cmd, false, (val || ''));
  }

  supported(cmd) {
    var css = !!document.queryCommandSupported(cmd) ? 'btn-succes' : 'btn-error'
    return css
  };

  componentDidMount() {
    document.execCommand('enableInlineTableEditing', false, '');
    document.execCommand('enableObjectResizing', false, '');
  }

  render() {
    const Arrow = ({ text, className }) => {
      return (
        <div
          className={className}
        >{text}</div>
      );
    };


    const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
    const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

    return (
      <React.Fragment>
        <ScrollMenu
          hideSingleArrow={true}
          data={commands.map(item => (
            <Button
              className="btn"
              key={_.uniqueId()}
              icon={item.icon}
              title={item.cmd}
              onClick={() => this.doCommand(item)}/>
          ))}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
        />

      </React.Fragment>
    );
  }
}

export default Toolbar;


