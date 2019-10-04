import React from "react";



class EditableArea extends React.PureComponent {
  isChildOf(node, parentId) {
      while (node !== null) {
        if (node.id === parentId) {
          return true;
        }
        node = node.parentNode;
      }

      return false;
    };

  getCurrentCursorPosition(parentId) {
    var selection = window.getSelection(),
        charCount = -1,
        node;

    if (selection.focusNode) {
      if (this.isChildOf(selection.focusNode, parentId)) {
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
    console.log(selection, charCount, node, node.parentNode.nodeName === 'FONT' && node.parentNode.face);
    return charCount;
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
