import React from "react";
import { connect } from 'react-redux';
import { getModifiers } from '../../actions/editorActions';
import { Card, Elevation } from '@blueprintjs/core';

import * as classes from './styles.scss';

class EditableArea extends React.PureComponent {
  public render() {
    return (
      <Card elevation={Elevation.TWO} className={classes.editableArea}>           
      <div
        id="textBox"
        onClick={() => this.props.getModifiers()}
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
  getModifiers: (command, value) => dispatch(getModifiers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditableArea);
