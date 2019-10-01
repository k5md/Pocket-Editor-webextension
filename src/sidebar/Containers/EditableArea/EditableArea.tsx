import React from "react";

class EditableArea extends React.PureComponent {
  public render() {
    return (
      <div id="textBox" contentEditable="true"><p>Lorem ipsum</p></div>
    );
  }
}

export default EditableArea;
