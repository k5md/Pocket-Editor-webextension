import React from "react";
import { Button, MenuItem, Menu } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { uniqueId } from 'lodash';

const fontSizes = [...Array(80)
  .fill(0)
  .map((v, i) => i)
  .filter(v => v % 2 === 0 && v >= 8)
];

const itemRenderer = (item, { handleClick, modifiers }) => (
  <MenuItem
    active={modifiers.active}
    key={uniqueId()}
    onClick={handleClick}
    text={item}
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

const FontSizePicker = ({
  onItemSelect,
  fontSize,
}) => (
  <Select
      itemRenderer={itemRenderer}
      items={fontSizes}
      itemListRenderer={renderMenu}
      onItemSelect={onItemSelect}
      filterable={false}
      activeItem={fontSize}
      popoverProps={{ minimal: true }}
  >
    <Button
      text={fontSize}
      rightIcon="caret-down"
    />
  </Select>
);

export default FontSizePicker;
