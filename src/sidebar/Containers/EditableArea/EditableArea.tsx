import React from "react";
import { omitBy, isUndefined, isNaN } from 'lodash';
import { connect } from 'react-redux';
import { setModifiers } from '../../actions/editorActions';

class EditableArea extends React.PureComponent {
  retrieveModifiers() {
    const selection = window.getSelection();

    if (!selection.focusNode) {
      return;
    }

    const nameModifierMap = {
      UL: () => ({ list: 'unordered' }),
      OL: () => ({ list: 'ordered' }),
      B: () => ({ emphasis: { bold: true }, }),
      I:() => ({ emphasis: { italic: true }, }),
      U: () => ({ emphasis: { underlined: true }, }),
      STRIKE:() => ({ emphasis: { strikethrough: true }, }),
      DIV: node => ({ justify: node.align }),
      FONT: node => ({ font: node.face, fontSize: Number.parseInt(node.style['font-size'])}),
    };

    const target = selection.focusNode;

    let node = target;
    let modifiers = {};
    while (node.id !== 'textBox') {
      if (nameModifierMap[node.nodeName]) {
        
        const match = nameModifierMap[node.nodeName](node);
        const modifier = _.omitBy(match, value => isUndefined(value) || value === '' || isNaN(value));
        console.log(node, node.nodeName, match, modifier);
        modifiers = {...modifiers, ...modifier };
      }
      node = node.parentNode;
    }

    this.props.setModifiers(modifiers);
    return;
  }

  public render() {
    return (
      <div
        id="textBox"
        onClick={() => this.retrieveModifiers()}
        contentEditable="true"
      >
        <p>Lorem ipsum</p>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  setModifiers: (modifiers) => dispatch(setModifiers(modifiers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditableArea);
