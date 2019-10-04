import React, { Component } from 'react';
import { Button, ButtonGroup, Divider, } from '@blueprintjs/core';
import _ from 'lodash';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import FontPicker from '../FontPicker';
import FontSizePicker from '../FontSizePicker';


const commands = [
  [
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
    }, 
  ],
  [
    {
      cmd: 'insertOrderedList',
      icon: 'numbered-list',
    }, {
      cmd: 'insertUnorderedList',
      icon: 'properties',
    }, 
  ],
  [
    {
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
    },
  ],
  [
    {
      cmd: 'redo',
      icon: 'redo',
    }, {
      cmd: 'undo',
      icon: 'undo',
    },
  ],
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
        <ButtonGroup className="commandGroup">
          <FontPicker />
          <FontSizePicker />
        </ButtonGroup>


        {commands.map(group => (
            <ButtonGroup className="commandGroup">
              {group.map(item => (
                <Button
                  key={_.uniqueId()}
                  icon={item.icon}
                  title={item.cmd}
                  onClick={() => this.doCommand(item)}/>
              ))}
            </ButtonGroup>
          ))}
      </React.Fragment>
    );
  }
}

export default Toolbar;


