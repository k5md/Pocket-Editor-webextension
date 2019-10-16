import React from "react";
import { connect } from 'react-redux';
import {
  ButtonGroup,
  Popover,
  AnchorButton,
  Menu,
  Classes,
  PopoverInteractionKind,
} from '@blueprintjs/core';
import {
  importDocument,
  exportDocument,
} from '../../actions/editorActions';

const Menubar = ({
  importDocument,
  exportDocument,
}) => (
  <ButtonGroup>
    <Popover>
      <AnchorButton
        minimal
        icon="document"
        rightIcon="caret-down"
        text="File"
        interactionKind={PopoverInteractionKind.HOVER}
      />
      <Menu>
        <Menu.Item minimal icon="document" text="New" />
        <Menu.Item minimal icon="folder-shared" text="Import"
          onClick={(e) => {
            e.preventDefault();
            importDocument()
          }} 
        />
        <Menu.Item minimal icon="add-to-folder" text="Close" />
        <Menu.Item minimal icon="floppy-disk" text="Save" />
        <Menu.Item minimal icon="floppy-disk" text="Export"
          onClick={(e) => {
            e.preventDefault();
            exportDocument()
          }} 
        />
      </Menu>
    </Popover>
  </ButtonGroup>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  importDocument: () => dispatch(importDocument()),
  exportDocument: () => dispatch(exportDocument()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menubar);
