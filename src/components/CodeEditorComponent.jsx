import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFile } from '../redux/fileSystemSlice';

const MonacoEditorComponent = () => {
  const dispatch = useDispatch();
  const files = useSelector(state => state.fileSystemSlice.files);
  const activeFileId = useSelector(state => state.fileSystemSlice.activeFileId);

  const activeFile = files.find(file => file.id === activeFileId);
  const [editorKey, setEditorKey] = useState(activeFileId);

  useEffect(() => {
    if (activeFile) {
      console.log('Active File Content:', activeFile.content); 
    }
  }, [activeFile]);

  const getFileLanguage = fileName => {
    const extension = fileName.split('.').pop();
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'txt':
        return 'plaintext';
      default:
        return 'plaintext';
    }
  };

  const handleChange = (newValue, e) => {
    if (activeFile) {
      dispatch(updateFile({ id: activeFile.id, content: newValue }));
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    console.log('Editor mounted');
  };

  useEffect(() => {
    setEditorKey(activeFileId);
  }, [activeFileId]);

  return (
    <div className="editor">
      {activeFile && (
        <Editor
          key={editorKey}
          height="100vh"
          language={getFileLanguage(activeFile.name)}
          defaultValue={activeFile.content}
          theme="vs-dark"
          editorDidMount={handleEditorDidMount}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default MonacoEditorComponent;
