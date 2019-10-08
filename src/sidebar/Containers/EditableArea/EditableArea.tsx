import React from "react";



class EditableArea extends React.PureComponent {
  getCurrentCursorPosition(parentId) {
    const selection = window.getSelection();

    if (!selection.focusNode) {
      return;
    }

    const target = selection.focusNode;
    let node = target;

    while (node.id !== 'textBox') {
      console.log(node);
      node = node.parentNode;
    }
  }

  public render() {
    return (
      <div
        id="textBox"
        onClick={() => this.getCurrentCursorPosition()}
        contentEditable="true"
      >
        <p>Lorem ipsum</p>
      </div>
    );
  }
}

export default EditableArea;
