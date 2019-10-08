import React, { Component } from 'react';

import Toolbar from '../Toolbar';
import EditableArea from '../EditableArea';
import { Elevation, Card, FileInput } from "@blueprintjs/core";
import {
  Button,
  Intent,
  Popover,
  PopoverInteractionKind,
  Position,
  Navbar,
  Alignment,
  Collapse,
  Menu,
  ButtonGroup,
  AnchorButton,
} from "@blueprintjs/core";

import mammoth from 'mammoth';
import { connect } from 'react-redux';
import { setCursorPosition } from '../../actions/editorActions';

import './styles.scss';

const exportHandler = () => {
  const payload = JSON.stringify(state()['#input-blacklist-pattern']);
  const a = document.createElement('a');
  a.download = 'TotalSuspenderBlacklist.json';
  a.href = `data:application/octet-stream,${payload}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const openHandler = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (fileContainer) => {
      const arrayBuffer = fileContainer.target.result;
      console.log(arrayBuffer);

      const transformElement = (element) => {
        if (element.children) {
          var children = _.map(element.children, transformElement);
          element = {...element, children: children};
        }

        if (element.type === "paragraph") {
          element = transformParagraph(element);
        }

        return element;
      }

      const transformParagraph = (element) => {
        if (element.alignment === "center" && !element.styleId) {
          return {...element, styleId: "Heading2"};
        } else {
          return element;
        }
      }
      const html = await mammoth.convertToHtml({ arrayBuffer }, {
        ignoreEmptyParagraphs: false,
        transformDocument: transformElement,
      });
      console.log(html);
      console.log(this.editableArea);
      document.querySelector("#textBox").innerHTML = html.value;
      document.body.removeChild(fileInput);
    };
    reader.readAsArrayBuffer(file);
  };
  document.body.appendChild(fileInput);
  fileInput.click();
}

class Editor extends Component {
  state = {
    editToolbarOpen: true,
  }

  toggleEditToolbar () {
    this.setState({ editToolbarOpen: !this.state.editToolbarOpen});
  }

  render() {
    const fileMenu = (
      <Menu>
        <Menu.Item minimal icon="document" text="New" />
        <Menu.Item minimal icon="folder-shared" text="Open..." onClick={openHandler} />
        <Menu.Item minimal icon="add-to-folder" text="Close" />
        <Menu.Item minimal icon="floppy-disk" text="Save" />
        <Menu.Item minimal icon="floppy-disk" text="Save as..." />
      </Menu>
    );


    return (
      <div className="editor">
        <div className="toolbar">
          <ButtonGroup fill>
            <Popover content={fileMenu} >
              <AnchorButton minimal icon="document" rightIcon="caret-down" text="File" />
            </Popover>
            <Button minimal icon="edit" text="Edit" onClick={() => this.toggleEditToolbar()}/>
          </ButtonGroup>

          <Collapse isOpen={this.state.editToolbarOpen} keepChildrenMounted transitionDuration={200}>
            <Toolbar documentRef={this.editableArea}/>
          </Collapse>
        </div>

        
        <Card elevation={Elevation.TWO} className="editableArea">
          <EditableArea ref={(ref) => { this.editableArea = ref; }}/>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ editorReducer }) => {
  const { cursorPosition } = editorReducer;
  return {
    cursorPosition,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setCursorPosition: (cursorPosition) => dispatch(setCursorPosition(cursorPosition)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
