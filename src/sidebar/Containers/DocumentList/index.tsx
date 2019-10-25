import { connect } from 'react-redux';
import DocumentList from './DocumentList';
import { setCurrentDocument } from '../../actions/editorActions';

const mapStateToProps = ({ editorReducer }) => {
  const { documents, currentDocument } = editorReducer;
  return {
    documents,
    currentDocument,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentDocument: index => dispatch(setCurrentDocument(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
