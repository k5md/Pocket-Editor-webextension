import React from "react";

import { Button, MenuItem, Menu } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

import fontFamilies from './font-families.json';
import FontDetector from './detect-available-fonts';
import _ from 'lodash';

class FontPicker extends React.Component {
  componentDidMount() {
    const d = new FontDetector();
    const installedFonts = fontFamilies.filter(d.detect);
    this.setState({ installedFonts, selectedFont: installedFonts[0] });
  }

  state = {
    installedFonts: [],
    selectedFont: '',
  };

  public render() {
    const onItemSelect = (item) => {
      const action = {
        cmd: 'fontName',
        val: item,
      };

      let { cmd, val } = action;
      console.log(cmd, val);

      document.execCommand(cmd, false, (val || ''));
      this.setState({ selectedFont: item })
    }

    const itemRenderer = (item, { handleClick, modifiers }) => {
      if (!modifiers.matchesPredicate) {
        return null;
      }
      return (
        <MenuItem
          active={modifiers.active}
          key={_.uniqueId()}
          onClick={handleClick}
          text={item}
          style={{'fontFamily': item}}
        />
      );
    };

    const renderMenu = ({ items, itemsParentRef, query, renderItem }) => {
      const renderedItems = items.map(renderItem).filter(item => item != null);
      return (
        <Menu className="fontMenu" ulRef={itemsParentRef}>
          {renderedItems}
        </Menu>
      );
    };

    return (
      <Select
          items={this.state.installedFonts}
          itemRenderer={itemRenderer}
          itemListRenderer={renderMenu}
          onItemSelect={onItemSelect}
          filterable={false}
          activeItem={this.state.selectedFont}
          popoverProps={{ minimal: true }}
      >
        <Button
          text={this.state.selectedFont}
          style={{'fontFamily': this.state.selectedFont}}
          rightIcon="caret-down"
        />
      </Select>
    );
  }
}

export default FontPicker;
