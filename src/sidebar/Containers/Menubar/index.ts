import { connect } from 'react-redux';
import Menubar from './Menubar.tsx';
import {
  importDocument,
  exportDocument,
  newDocument,
  deleteDocument,
} from '../../actions/editorActions';

const mapDispatchToProps = (dispatch) => ({
  importDocument: (file) => dispatch(importDocument(file)),
  exportDocument: (extension) => dispatch(exportDocument(extension)),
  newDocument: () => dispatch(newDocument()),
  deleteDocument: () => dispatch(deleteDocument()),
});

export default connect(null, mapDispatchToProps)(Menubar);
