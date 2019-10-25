import { connect } from 'react-redux';
import Toolbar from './Toolbar.tsx';
import { saveDocument, setModifiers } from '../../actions/editorActions';

const mapStateToProps = ({ editorReducer }) => {
  const { modifiers } = editorReducer;
  return { modifiers };
};

const mapDispatchToProps = dispatch => ({
  setModifiers: modifiers => dispatch(setModifiers(modifiers)),
  saveDocument: () => dispatch(saveDocument()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
