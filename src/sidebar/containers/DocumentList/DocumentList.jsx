import React, { useCallback } from "react";
import DocumentItem from '../DocumentItem';
import { Panels, EditableText } from '../../components';

const DocumentList = ({
  documents,
  setCurrentDocument,
  currentDocument,
  setDocumentTitle,
}) => {
  const renderInput = useCallback((item, index) => {
    if (index !== currentDocument) {
      return item.props.title;
    }
    return (<EditableText value={item.props.title} onChange={setDocumentTitle} />);
  }, [currentDocument, setDocumentTitle]);

  return (
    <Panels
      onActiveChange={curIdx => setCurrentDocument(curIdx)}
      activeIndex={currentDocument}
      renderCaption={renderInput}
    >
      {documents.map(({ content, id, title }) => (
        <DocumentItem key={id} title={title} content={content} documentId={id} />
      ))}
    </Panels>
  );
};

export default DocumentList;
