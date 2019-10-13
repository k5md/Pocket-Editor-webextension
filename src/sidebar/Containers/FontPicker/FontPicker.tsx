import React from "react";
import { Button, MenuItem, Menu } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import fontFamilies from './font-families.json';
import FontDetector from './detect-available-fonts';
import { uniqueId } from 'lodash';

const itemRenderer = (item, { handleClick, modifiers }) => {
  return (
    <MenuItem
      active={modifiers.active}
      key={uniqueId()}
      onClick={handleClick}
      text={item}
      style={{'fontFamily': item}}
    />
  );
};

const itemListPredicate = (query, items) => {
  return items.filter(item => item.toLowerCase().indexOf(query.toLowerCase()) >= 0);
};

const itemListRenderer = ({
  items,
  filteredItems,
  itemsParentRef,
  query,
  renderItem,
}) => {
  // NOTE: for some reason during first render with empty query, filtered items is an empty array
  // though if one types anything and then deletes, getting empty query again, filtered items
  // would contain all items as expected
  const renderedItems = (query === '' ? items : filteredItems).map(renderItem);

  return (
    <Menu className="fontMenu" ulRef={itemsParentRef}>
      <MenuItem
        disabled={true}
        text={`Found ${renderedItems.length} fonts matching "${query}"`}
      />
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
        itemListRenderer={itemListRenderer}
        onItemSelect={onItemSelect}
        itemListPredicate={itemListPredicate}
        filterable={false}
        activeItem={font}
        popoverProps={{ minimal: true }}
      >
        <Button
          text={font || 'Select font...'}
          style={{'fontFamily': font || 'inherit'}}
          rightIcon="caret-down"
        />
      </Select>
    );
  }
}

export default FontPicker;
