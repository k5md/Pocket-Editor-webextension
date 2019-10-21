import React from "react";
import { connect } from 'react-redux';
import {
  ButtonGroup,
  Popover,
  AnchorButton,
  Menu,
  MenuItem,
  PopoverInteractionKind,
} from '@blueprintjs/core';
import { FileInput } from '../../components';
import {
  importDocument,
  exportDocument,
  newDocument,
  deleteDocument,
  saveDocument,
} from '../../actions/editorActions';

// NOTE: as soon, as the BUG with MenuItems not dismissing the popover correctly because of 
// isDefaultPrevented missing function ( https://github.com/palantir/blueprint/issues/2820 )
// remove event modification, since it WILL cause bugs 
const breakE = (e) => { e.isDefaultPrevented = () => false; };

const Menubar = ({
  importDocument,
  exportDocument,
  newDocument,
  deleteDocument,
  saveDocument,
  exportDocument,
}) => {
  const importSubmenu = (
    <MenuItem icon="folder-shared" text="Import"  onClick={e => breakE(e)}>
      <FileInput onInputChange={e => importDocument(e.target.files[0])} label='Word document (.docx)' />
    </MenuItem>
  );

  const exportSubmenu = (
    <MenuItem icon="floppy-disk" text="Export" onClick={e => breakE(e)}>
      <AnchorButton minimal onClick={() => exportDocument('.docx')}>Word document (.docx)</AnchorButton>
    </MenuItem>
  );

  return (
    <Popover>
      <AnchorButton minimal icon="document" rightIcon="caret-down" text="File"/>
      <Menu>
        <MenuItem icon="document" text="New" onClick={e => breakE(e) || newDocument()} />
        {importSubmenu}
        {exportSubmenu}
        <MenuItem icon="floppy-disk" text="Save" onClick={e => breakE(e) || saveDocument()} />
        <MenuItem icon="add-to-folder" text="Delete" onClick={e => breakE(e) || deleteDocument()} />
      </Menu>
    </Popover>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  importDocument: (file) => dispatch(importDocument(file)),
  exportDocument: () => dispatch(exportDocument()),
  newDocument: () => dispatch(newDocument()),
  deleteDocument: () => dispatch(deleteDocument()),
  saveDocument: () => dispatch(saveDocument()),
  exportDocument: () => dispatch(exportDocument()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menubar);
