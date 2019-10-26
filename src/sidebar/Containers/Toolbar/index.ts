import { connect } from 'react-redux';
import Toolbar from './Toolbar.tsx';
import { saveDocument, setModifiers } from '../../actions/editorActions';

const mapStateToProps = ({ editorReducer }) => {
  const { modifiers, documents, currentDocument } = editorReducer;
  return {
    modifiers,
    documentId: documents[currentDocument].id,
  };
};

const mapDispatchToProps = dispatch => ({
  setModifiers: modifiers => dispatch(setModifiers(modifiers)),
  saveDocument: (content) => dispatch(saveDocument(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
