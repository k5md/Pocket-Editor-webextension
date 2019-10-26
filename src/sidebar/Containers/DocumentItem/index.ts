import { connect } from 'react-redux';
import {
  saveDocument,
  setModifiers,
} from '../../actions/editorActions';
import DocumentItem from './DocumentItem.tsx';

const mapStateToProps = ({ editorReducer }) => {
  const {
    documents,
    currentDocument,
  } = editorReducer;
  const { content } = documents[currentDocument];
  return { content };
};

const mapDispatchToProps = (dispatch) => ({
  saveDocument: content => dispatch(saveDocument(content)),
  setModifiers: modifiers => dispatch(setModifiers(modifiers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentItem);
