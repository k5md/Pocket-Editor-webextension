import React, { useState, useCallback } from "react";
import {
  Popover,
  Button,
  AnchorButton,
  Menu,
  MenuItem,
  Divider,
} from '@blueprintjs/core';
import { FileInput } from '../../components';

// NOTE: as soon, as the BUG with MenuItems not dismissing the popover correctly because of 
// isDefaultPrevented missing function ( https://github.com/palantir/blueprint/issues/2820 ) is fixed
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
  const handleNewDocument = useCallback((e)=> {
    breakE(e);
    newDocument();
  }, [newDocument]);
  const handleDeleteDocument = useCallback((e) => {
    breakE(e);
    deleteDocument();
  }, [deleteDocument]);
  const handleImportDocument = useCallback(e => importDocument(e.target.files[0]), [importDocument]);

  const newMenuItem = (
    <MenuItem icon="document" text={browser.i18n.getMessage('menuNewDocument')} onClick={handleNewDocument}/>
  );

  const importMenuItem = (
    <MenuItem icon="add-to-folder" text={browser.i18n.getMessage('menuImportDocument')}>
      <FileInput
        onClick={() => setFileMenuOpen(false)}
        onInputChange={handleImportDocument}
        label={browser.i18n.getMessage('menuWordDocument')}
        inputProps={{ accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }}
      />
      <FileInput
        onClick={() => setFileMenuOpen(false)}
        onInputChange={handleImportDocument}
        label={browser.i18n.getMessage('menuPlainTextDocument')}
        inputProps={{ accept: 'text/plain' }}
      />
      <FileInput
        onClick={() => setFileMenuOpen(false)}
        onInputChange={handleImportDocument}
        label={browser.i18n.getMessage('menuMarkdownDocument')}
      />
    </MenuItem>
  );

  const exportMenuItem = (
    <MenuItem icon="folder-shared" text={browser.i18n.getMessage('menuExport')}>
      <AnchorButton minimal onClick={() => { exportDocument('doc'); setFileMenuOpen(false); }}>
        {browser.i18n.getMessage('menuWordDocument')}
      </AnchorButton>
      <AnchorButton minimal onClick={() => { exportDocument('txt'); setFileMenuOpen(false); }}>
        {browser.i18n.getMessage('menuPlainTextDocument')}
      </AnchorButton>
      <AnchorButton minimal onClick={() => { exportDocument('md'); setFileMenuOpen(false); }}>
        {browser.i18n.getMessage('menuMarkdownDocument')}
      </AnchorButton>
    </MenuItem>
  );

  const deleteMenuItem = (
    <MenuItem icon="delete" text={browser.i18n.getMessage('menuDeleteDocument')} onClick={handleDeleteDocument} />
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
      <Button minimal icon="document" onClick={handleNewDocument} />
      <Button minimal icon="delete" onClick={handleDeleteDocument} />
    </div>
  );

  return (
    <div className={classes.menubar}>
      <Popover content={fileMenu} isOpen={fileMenuOpen} onInteraction={state => setFileMenuOpen(state)}>
        <Button minimal icon="document" rightIcon="caret-down" text={browser.i18n.getMessage('menuFile')} />
      </Popover>
      <Divider />
      {quickActions}
    </div>
  );
};

export default Menubar;
