import React from "react";
import DocumentItem from '../DocumentItem';
import { Panels } from '../../components';

const DocumentList = ({
  documents,
  setCurrentDocument,
  currentDocument,
}) => (
  <Panels
    onActiveChange={curIdx => setCurrentDocument(curIdx)}
    activeIndex={currentDocument}
  >
    {documents.map(({ title, content, id }) => (
      <DocumentItem
        key={id}
        id={id}
        title={title}
        content={content}
      />
    ))}
  </Panels>
);

export default DocumentList;
