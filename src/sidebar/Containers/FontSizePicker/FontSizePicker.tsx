import React from "react";

import { Button, MenuItem, Menu } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

import _ from 'lodash';

class FontSizePicker extends React.Component {
  state = {
    fontSize: 12,
    fontSizes: [...Array(80).fill(0).map((v, i) => i).filter(v => v % 2 === 0 && v >= 8)],
  };

  public render() {
    const onItemSelect = (item) => {
      const action = {
        cmd: 'fontSize',
        val: 'item',
      };

      let { cmd, val } = action;
      console.log(cmd, val);

      document.execCommand(cmd, false, (val || ''));
      this.setState({ fontSize: item })
    }

    const itemRenderer = (item, { handleClick, modifiers }) => {
      return (
        <MenuItem
          active={modifiers.active}
          key={_.uniqueId()}
          onClick={handleClick}
          text={item}
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
          itemRenderer={itemRenderer}
          items={this.state.fontSizes}
          itemListRenderer={renderMenu}
          onItemSelect={onItemSelect}
          filterable={false}
          activeItem={this.state.fontSize}
          popoverProps={{ minimal: true }}
      >
        <Button
          text={this.state.fontSize}
          rightIcon="caret-down"
        />
      </Select>
    );
  }
}

export default FontSizePicker;







