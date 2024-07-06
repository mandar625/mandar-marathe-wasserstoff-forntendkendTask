import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFolder, addFile, deleteFile, deleteFolder, setActiveFile } from '../redux/fileSystemSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const folders = useSelector(state => state.fileSystemSlice.folders);
  const files = useSelector(state => state.fileSystemSlice.files);
  const activeFileId = useSelector(state => state.fileSystemSlice.activeFileId);

  let fileNameInputRef = useRef(null);
  let extensionSelectRef = useRef(null);

  const handleSetActiveFile = fileId => {
    dispatch(setActiveFile(fileId));
  };

  const handleAddFolder = () => {
    const newFolder = { name: 'New Folder', id: generateId('folder'), type: 'folder', parentId: null };
    dispatch(addFolder(newFolder));
  };

  const handleAddFile = (folderId, fileName, extension) => {
    let initialContent = '// Start coding...';
  
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
      name: `${fileName}.${extension}`,
      id: generateId('file'),
      type: 'file',
      content: initialContent,
      parentId: folderId,
    };
  
    dispatch(addFile(newFile));
    dispatch(setActiveFile(newFile.id));

    // Clear input fields after adding file
    fileNameInputRef.current.value = '';
    extensionSelectRef.current.value = 'js'; // Reset to default extension
  };

  const handleDeleteFile = fileId => {
    dispatch(deleteFile(fileId));
  };

  const handleDeleteFolder = folderId => {
    dispatch(deleteFolder(folderId));
  };

  const generateId = prefix => {
    return prefix + '_' + Math.random().toString(36).substr(2, 9);
  };

  const renderFolder = folder => (
    <div key={folder.id} className="folder">
      <div className="folder-header">
        <span>{folder.name}</span>
        <button onClick={() => handleDeleteFolder(folder.id)}>Delete Folder</button>
      </div>
      <div className="folder-content">
        {folders.filter(subFolder => subFolder.parentId === folder.id).map(subFolder => renderFolder(subFolder))}
        <div className="add-file">
          <input type="text" placeholder="File Name" ref={fileNameInputRef} />
          <select ref={extensionSelectRef}>
            <option value="js">.js</option>
            <option value="html">.html</option>
            <option value="css">.css</option>
            <option value="txt">.txt</option>
          </select>
          <button onClick={() => handleAddFile(folder.id, fileNameInputRef.current.value, extensionSelectRef.current.value)}>
            Add File
          </button>
        </div>
        {files.filter(file => file.parentId === folder.id).map(file => (
          <div key={file.id} className={`file ${file.id === activeFileId ? 'active' : ''}`} onClick={() => handleSetActiveFile(file.id)}>
            <span>{file.name}</span>
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
