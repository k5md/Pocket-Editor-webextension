import React, { useState } from "react";
import {
  Tab,
  Tabs,
  AnchorButton,
  Icon,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import * as classes from './styles.scss';
import EditableArea from '../EditableArea';
import { PanelList } from '../../components';

const DocumentStack = () => {
  return (
    <PanelList>
      <EditableArea />
      <EditableArea />
    </PanelList>
  );
};

export default DocumentStack;
