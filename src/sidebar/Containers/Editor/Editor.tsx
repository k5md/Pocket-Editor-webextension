import React, { Component } from 'react';

import Toolbar from '../Toolbar';
import EditableArea from '../EditableArea';
import { FileInput } from "@blueprintjs/core";

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


import { connect } from 'react-redux';
import { importDocument, exportDocument } from '../../actions/editorActions';
import './styles.scss';

class Editor extends Component {
  state = {
    editToolbarOpen: true,
  }

  toggleEditToolbar () {
    this.setState({ editToolbarOpen: !this.state.editToolbarOpen});
  }

  render() {
    const {
      importDocument,
      exportDocument,
    } = this.props;

    console.log(importDocument, exportDocument);

    const fileMenu = (
      <Menu>
        <Menu.Item minimal icon="document" text="New" />
        <Menu.Item minimal icon="folder-shared" text="Open..." onClick={() => importDocument()} />
        <Menu.Item minimal icon="add-to-folder" text="Close" />
        <Menu.Item minimal icon="floppy-disk" text="Save" />
        <Menu.Item minimal icon="floppy-disk" text="Save as..." onClick={() => exportDocument()} />
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
            <Toolbar/>
          </Collapse>
        </div>

        <EditableArea className="editableArea"/>

      </div>
    );
  }
}

const mapStateToProps = ({ editorReducer }) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    importDocument: () => dispatch(importDocument()),
    exportDocument: () => dispatch(exportDocument()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
