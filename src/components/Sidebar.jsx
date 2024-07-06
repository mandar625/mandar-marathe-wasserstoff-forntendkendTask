import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFolder, addFile, deleteFile, deleteFolder, setActiveFile, updateFileName, updateFolderName } from '../redux/fileSystemSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const folders = useSelector(state => state.fileSystemSlice.folders);
  const files = useSelector(state => state.fileSystemSlice.files);
  const activeFileId = useSelector(state => state.fileSystemSlice.activeFileId);

  let fileNameInputRef = useRef(null);
  const [editFileName, setEditFileName] = useState(null); 
  const [editFolderName, setEditFolderName] = useState(null);

  const handleSetActiveFile = fileId => {
    dispatch(setActiveFile(fileId));
  };

  const handleAddFolder = () => {
    const newFolder = { name: 'New Folder', id: generateId('folder'), type: 'folder', parentId: null };
    dispatch(addFolder(newFolder));
  };

  const handleAddFile = (folderId, fileName) => {
    let initialContent = '// Start coding...';
    const  extension = fileName.split(".").pop()
    switch (extension) {
      case 'js':
        initialContent = `console.log('Hello, world!');\n\nfunction greet(name) {\n  return 'Hello, ' + name + '!';\n}`;
        break;
      case 'html':
        initialContent = `<!DOCTYPE html>\n<html>\n<head>\n  <title>Page Title</title>\n</head>\n<body>\n\n  <script>\n    // JavaScript code here\n  </script>\n</body>\n</html>`;
        break;
      case 'css':
        initialContent = `/* CSS styles */\nbody {\n  font-family: Arial, sans-serif;\n  background-color: #f0f0f0;\n}`;
        break;
      case 'txt':
        initialContent = `Sample text file content\n\nLine 1\nLine 2\nLine 3`;
        break;
      default:
        initialContent = '// Start coding...';
    }
  
    const newFile = {
      name: fileName,
      id: generateId('file'),
      type: 'file',
      content: initialContent,
      parentId: folderId,
    };
  
    dispatch(addFile(newFile));
    dispatch(setActiveFile(newFile.id));

    fileNameInputRef.current.value = '';
  };

  const handleDeleteFile = fileId => {
    dispatch(deleteFile(fileId));
  };

  const handleDeleteFolder = folderId => {
    dispatch(deleteFolder(folderId));
  };

  const handleEditFileName = fileId => {
    setEditFileName(fileId);
  };

  const handleSaveFileName = (fileId, newName) => {
    dispatch(updateFileName({ id: fileId, newName }));
    setEditFileName(null); 
  };

  const handleEditFolderName = folderId => {
    setEditFolderName(folderId);
  };

  const handleSaveFolderName = (folderId, newName) => {
    dispatch(updateFolderName({ id: folderId, newName }));
    setEditFolderName(null); 
  };
  const handleKeyPress = (e, saveFunc) => {
    if (e.key === 'Enter') {
      saveFunc();
    }
  };
  const generateId = prefix => {
    return prefix + '_' + Math.random().toString(36).slice(2, 9);
  };

  const renderFolder = folder => (
    <div key={folder.id} className="folder">
      <div className="folder-header">
        {editFolderName === folder.id ? (
          <input
            type="text"
            defaultValue={folder.name}
            onBlur={e => handleSaveFolderName(folder.id, e.target.value)}
            onKeyDown={e => handleKeyPress(e, () => handleSaveFolderName(folder.id, e.target.value))}
            autoFocus
          />
        ) : (
          <span onDoubleClick={() => handleEditFolderName(folder.id)}>{folder.name}</span>
        )}
        <button style={{background:"gray"}}  onClick={() => handleEditFolderName(folder.id)}>Edit Folder</button>
        <button onClick={() => handleDeleteFolder(folder.id)}>Delete Folder</button>
      </div>
      <div className="folder-content">
        {folders.filter(subFolder => subFolder.parentId === folder.id).map(subFolder => renderFolder(subFolder))}
        <div className="add-file">
          <input type="text" placeholder="example.js" ref={fileNameInputRef} />
          <button  onClick={() => handleAddFile(folder.id, fileNameInputRef.current.value)}>
            Add File
          </button>
        </div>
        {files.filter(file => file.parentId === folder.id).map(file => (
          <div key={file.id} className={`file ${file.id === activeFileId ? 'active' : ''}`} onClick={() => handleSetActiveFile(file.id)}>
            {editFileName === file.id ? (
              <input
                type="text"
                defaultValue={file.name} 
                onBlur={e => handleSaveFileName(file.id, `${e.target.value}`)} 
                onKeyDown={e => handleKeyPress(e, () => handleSaveFileName(file.id, e.target.value))}
                autoFocus
              />
            ) : (
              <span onDoubleClick={() => handleEditFileName(file.id)}>{file.name}</span>
            )}
            <button style={{background:"gray"}} onClick={() => handleEditFileName(file.id)}>Edit File</button>
            <button onClick={() => handleDeleteFile(file.id)}>Delete File</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="sidebar">
      <button onClick={handleAddFolder}>Add Folder</button>
      {folders.map(folder => renderFolder(folder))}
    </div>
  );
};

export default Sidebar;
