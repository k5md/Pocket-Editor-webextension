import React from "react";
import { connect } from 'react-redux';
import {
  ButtonGroup,
  Popover,
  AnchorButton,
  Menu,
  Classes,
  PopoverInteractionKind,
  FileInput,
} from '@blueprintjs/core';
import {
  importDocument,
  exportDocument,
  newDocument,
} from '../../actions/editorActions';

import * as classes from './styles.scss';

const Menubar = ({
  importDocument,
  exportDocument,
  newDocument,
  closeDocument,
  saveDocument,
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
        <Menu.Item minimal icon="document" text="New"
          onClick={(e) => { e.preventDefault(); newDocument(); }}
        />
        <Menu.Item minimal icon="folder-shared" text="Import" className={classes.menuItemFile} 
          labelElement={
            <FileInput
              className={classes.labelElement}
              onInputChange={(e) => importDocument(e.target.files[0])}
              text="Choose file..."
            />
          }
        />
        <Menu.Item minimal icon="add-to-folder" text="Close"
          onClick={(e) => { e.preventDefault(); closeDocument(); }}
        />
        <Menu.Item minimal icon="floppy-disk" text="Save" 
          onClick={(e) => { e.preventDefault(); saveDocument(); }}
        />
        <Menu.Item minimal icon="floppy-disk" text="Export"
          onClick={(e) => { e.preventDefault(); exportDocument(); }} 
        />
      </Menu>
    </Popover>
  </ButtonGroup>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  importDocument: (file) => dispatch(importDocument(file)),
  exportDocument: () => dispatch(exportDocument()),
  newDocument: () => dispatch(newDocument()),
  closeDocument: () => dispatch(closeDocument()),
  saveDocument: () => dispatch(saveDocument()),
  exportDocument: () => dispatch(exportDocument()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menubar);
