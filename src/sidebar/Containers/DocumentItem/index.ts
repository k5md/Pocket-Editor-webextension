import { connect } from 'react-redux';
import {
  retrieveModifiers,
  setDocumentRef,
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
  setDocumentRef: (ref) => dispatch(setDocumentRef(ref)),
  saveDocument: () => dispatch(saveDocument()),
  setModifiers: (modifiers) => dispatch(setModifiers(modifiers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentItem);
