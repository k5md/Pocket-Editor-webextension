import React from "react";
import { omitBy, isUndefined, isNaN } from 'lodash';
import { connect } from 'react-redux';
import { retrieveModifiers } from '../../actions/editorActions';
import { Card, Elevation } from '@blueprintjs/core';

class EditableArea extends React.PureComponent {
  public render() {
    return (
      <Card elevation={Elevation.TWO} className={this.props.className}>           
      <div
        id="textBox"
        onClick={() => this.props.retrieveModifiers()}
        contentEditable="true"
      >
        <p>Lorem ipsum</p>
      </div>
      </Card>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  retrieveModifiers: (command, value) => dispatch(retrieveModifiers(command, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditableArea);
