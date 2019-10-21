import React, { useState } from "react";
import { connect } from 'react-redux';
import {
  ButtonGroup,
  Popover,
  Button,
  AnchorButton,
  Menu,
  MenuItem,
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
// TLDR: before refactoring, consider existing bugs with menu & popover
const breakE = (e) => { e.isDefaultPrevented = () => false; };

const Menubar = ({
  importDocument,
  exportDocument,
  newDocument,
  deleteDocument,
  saveDocument,
}) => {
  const [ menuOpen, setMenuOpen ] = useState(false);

  const importSubmenu = (
    <MenuItem icon="add-to-folder" text="Import">
      <FileInput
        onClick={() => setMenuOpen(false)}
        onInputChange={e => importDocument(e.target.files[0])}
        label='Word document (.docx)'
        inputProps={{ accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }}
      />
    </MenuItem>
  );

  const exportSubmenu = (
    <MenuItem icon="folder-shared" text="Export">
      <AnchorButton minimal onClick={() => { exportDocument('doc'); setMenuOpen(false);}}>Word document (.doc)</AnchorButton>
    </MenuItem>
  );

  const menu = (
    <Menu>
      <MenuItem icon="document" text="New" onClick={()=> breakE(e) || newDocument()} />
      {importSubmenu}
      {exportSubmenu}
      <MenuItem icon="floppy-disk" text="Save" onClick={e => breakE(e) || saveDocument()} />
      <MenuItem icon="delete" text="Delete" onClick={e => breakE(e) || deleteDocument()} />
    </Menu>
  );

  return (
    <Popover content={menu} isOpen={menuOpen} onInteraction={state => setMenuOpen(state)}>
      <Button minimal icon="document" rightIcon="caret-down" text="File"/>
    </Popover>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  importDocument: (file) => dispatch(importDocument(file)),
  exportDocument: (extension) => dispatch(exportDocument(extension)),
  newDocument: () => dispatch(newDocument()),
  deleteDocument: () => dispatch(deleteDocument()),
  saveDocument: () => dispatch(saveDocument()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menubar);
