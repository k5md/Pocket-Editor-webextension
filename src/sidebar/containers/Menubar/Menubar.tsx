import React, { useState } from "react";
import {
  Popover,
  Button,
  AnchorButton,
  Menu,
  MenuItem,
} from '@blueprintjs/core';
import { FileInput } from '../../components';

// NOTE: as soon, as the BUG with MenuItems not dismissing the popover correctly because of 
// isDefaultPrevented missing function ( https://github.com/palantir/blueprint/issues/2820 )
// remove event modification, since it WILL cause bugs
// TLDR: before refactoring, consider existing bugs with menu & popover
import { breakE } from '../../../utils';
import * as classes from './styles.scss';

const Menubar = ({
  importDocument,
  exportDocument,
  newDocument,
  deleteDocument,
}) => {
  const [ fileMenuOpen, setFileMenuOpen ] = useState(false);

  const newMenuItem = (
    <MenuItem icon="document" text="New" onClick={(e)=> {
      breakE(e);
      newDocument()
    }}/>
  );

  const importMenuItem = (
    <MenuItem icon="add-to-folder" text="Import">
      <FileInput
        onClick={() => setFileMenuOpen(false)}
        onInputChange={e => importDocument(e.target.files[0])}
        label='Word document (.docx)'
        inputProps={{ accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }}
      />
      <FileInput
        onClick={() => setFileMenuOpen(false)}
        onInputChange={e => importDocument(e.target.files[0])}
        label='Plain text (.txt)'
        inputProps={{ accept: 'text/plain' }}
      />
      <FileInput
        onClick={() => setFileMenuOpen(false)}
        onInputChange={e => importDocument(e.target.files[0])}
        label='Markdown (.md)'
      />
    </MenuItem>
  );

  const exportMenuItem = (
    <MenuItem icon="folder-shared" text="Export">
      <AnchorButton minimal onClick={() => { exportDocument('doc'); setFileMenuOpen(false); }}>
        Word document (.doc)
      </AnchorButton>
      <AnchorButton minimal onClick={() => { exportDocument('txt'); setFileMenuOpen(false); }}>
        Plain text (.txt)
      </AnchorButton>
      <AnchorButton minimal onClick={() => { exportDocument('md'); setFileMenuOpen(false); }}>
        Markdown (.md)
      </AnchorButton>
    </MenuItem>
  );

  const deleteMenuItem = (
    <MenuItem icon="delete" text="Delete" onClick={(e) => {
      breakE(e);
      deleteDocument()
    }} />
  );

  const fileMenu = (
    <Menu>
      {newMenuItem}
      {importMenuItem}
      {exportMenuItem}
      {deleteMenuItem}
    </Menu>
  );

  const quickActions = (
    <div className={classes.quickActions}>
      <Button minimal icon="document" onClick={(e)=> {
        breakE(e);
        newDocument()
      }} />
      <Button minimal icon="delete" onClick={(e) => {
        breakE(e);
        deleteDocument()
      }} />
    </div>
  );

  return (
    <div className={classes.menubar}>
      <Popover content={fileMenu} isOpen={fileMenuOpen} onInteraction={state => setFileMenuOpen(state)}>
        <Button minimal icon="document" rightIcon="caret-down" text="File"/>
      </Popover>
      {quickActions}
    </div>
  );
};

export default Menubar;
