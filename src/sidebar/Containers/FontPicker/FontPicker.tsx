import React from "react";
import { Button, MenuItem, Menu } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import fontFamilies from './font-families.json';
import FontDetector from './detect-available-fonts';
import { uniqueId } from 'lodash';

const itemRenderer = (item, { handleClick, modifiers }) => (
  <MenuItem
    active={modifiers.active}
    key={uniqueId()}
    onClick={handleClick}
    text={item}
    style={{'fontFamily': item}}
  />
);

const renderMenu = ({ items, itemsParentRef, query, renderItem }) => {
  const renderedItems = items.map(renderItem).filter(item => item != null);

  return (
    <Menu className="fontMenu" ulRef={itemsParentRef}>
      {renderedItems}
    </Menu>
  );
};

class FontPicker extends React.Component {
  state = {
    installedFonts: []
  }

  componentDidMount() {
    const d = new FontDetector();
    this.setState({ installedFonts: fontFamilies.filter(d.detect) });
  }

  public render() {
    const {
      onItemSelect,
      font,
    } = this.props;

    const { installedFonts } = this.state;

    return (
      <Select
        items={installedFonts}
        itemRenderer={itemRenderer}
        itemListRenderer={renderMenu}
        onItemSelect={onItemSelect}
        filterable={false}
        activeItem={font}
        popoverProps={{ minimal: true }}
      >
        <Button
          text={font}
          style={{'fontFamily': font}}
          rightIcon="caret-down"
        />
      </Select>
    );
  }
}

export default FontPicker;
