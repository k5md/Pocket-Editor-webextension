import { connect } from 'react-redux';
import Toolbar from './Toolbar.tsx';
import { saveDocument, setModifiers } from '../../actions/editorActions';

const mapStateToProps = ({ editorReducer, documentReducer }) => {
  const { documents, currentDocument } = editorReducer;
  const { modifiers } = documentReducer;

  return {
    modifiers,
    documentId: documents[currentDocument] && documents[currentDocument].id,
  };
};

const mapDispatchToProps = dispatch => ({
  setModifiers: modifiers => dispatch(setModifiers(modifiers)),
  saveDocument: content => dispatch(saveDocument(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
