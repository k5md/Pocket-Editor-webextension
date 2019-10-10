import React from "react";

import { Button, MenuItem, Menu } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

import { uniqueId } from 'lodash';
import { connect } from 'react-redux';

const fontSizes = [...Array(80)
  .fill(0)
  .map((v, i) => i)
  .filter(v => v % 2 === 0 && v >= 8)
];

const isChildOf = (node, parentId) => {
      while (node !== null) {
        if (node.id === parentId) {
          return true;
        }
        node = node.parentNode;
      }

      return false;
    };

const getCurrentCursorPosition = (parentId) => {
    var selection = window.getSelection(),
        charCount = -1,
        node;

    if (selection.focusNode) {
      if (isChildOf(selection.focusNode, parentId)) {
          node = selection.focusNode; 
          charCount = selection.focusOffset;

          while (node) {
            if (node.id === parentId) {
              break;
            }

            if (node.previousSibling) {
              node = node.previousSibling;
              charCount += node.textContent.length;
            } else {
               node = node.parentNode;
               if (node === null) {
                 break
               }
            }
        }
      }
    }
    console.log(selection, node);
    return { selection, node };
  }

class FontSizePicker extends React.Component {
  state = {
    fontSize: 12,
    fontSizes: [...Array(80).fill(0).map((v, i) => i).filter(v => v % 2 === 0 && v >= 8)],
  };

  public render() {
    const onItemSelect = (item) => {
      const action = {
        cmd: 'fontSize',
        val: `${item}px`,
      };

      let { cmd, val } = action;
      console.log(cmd, val);

      const { selection, node } = getCurrentCursorPosition();
      document.execCommand("fontSize", false, "7");
      if (node.parentNode.nodeName === 'FONT' && node.parentNode) {
        node.parentNode.style['font-size'] = `${item}px`;
      }
      this.setState({ fontSize: item })
    }

    const itemRenderer = (item, { handleClick, modifiers }) => {
      return (
        <MenuItem
          active={modifiers.active}
          key={uniqueId()}
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

const mapStateToProps = ({ editorReducer }) => {
  const { modifiers: {
    fontSize,
  }} = editorReducer;

  return { fontSize };
};

export default connect(mapStateToProps)(FontSizePicker);

