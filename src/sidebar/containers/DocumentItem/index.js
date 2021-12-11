import { connect } from 'react-redux';
import {
  saveDocument,
  setModifiers,
} from '../../actions/editorActions';
import DocumentItem from './DocumentItem';

const mapDispatchToProps = (dispatch) => ({
  saveDocument: (content) => dispatch(saveDocument(content)),
  setModifiers: (modifiers) => dispatch(setModifiers(modifiers)),
});

export default connect(null, mapDispatchToProps)(DocumentItem);
