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
    this.setState({ installedFonts });
  }

  state = {
    installedFonts: []
  };

  public render() {
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
          style={{'font-family': item}}
        />
      );
    };

    const renderMenu = ({ items, itemsParentRef, query, renderItem }) => {
      const renderedItems = items.map(renderItem).filter(item => item != null);
      return (
        <Menu className="fontMenu" ulRef={itemsParentRef}>
          <MenuItem
              disabled={true}
              text={`Found ${renderedItems.length} items matching "${query}"`}
          />
          {renderedItems}
        </Menu>
      );
    };

    return (
      <Select
          items={this.state.installedFonts}
          itemRenderer={itemRenderer}
          itemListRenderer={renderMenu}
          noResults={<MenuItem disabled={true} text="No fonts found..." />}
          onItemSelect={(item) => console.log(item)}
      >
          <Button text={this.state.installedFonts[0]} rightIcon="double-caret-vertical" />
      </Select>
    );
  }
}

export default FontPicker;



/*{
    cmd: 'fontName',
    val: "'Inconsolata', monospace",
  }, {
    cmd: 'fontSize',
    val: '1-7',
    icon: 'text-height',
  },*/



