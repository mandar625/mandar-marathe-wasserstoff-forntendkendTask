import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  folders: [],
  files: [],
  activeFileId: null
};

const fileSystemSlice = createSlice({
  name: 'fileSystem',
  initialState,
  reducers: {
    addFolder(state, action) {
      state.folders.push(action.payload);
    },
    addFile(state, action) {
      state.files.push(action.payload);
    },
    updateFile(state, action) {
      const { id, content } = action.payload;
      const existingFile = state.files.find(file => file.id === id);
      if (existingFile) {
        existingFile.content = content;
      }
    },
    updateFileName(state, action) {
      const { id, newName } = action.payload;
      const existingFile = state.files.find(file => file.id === id);
      if (existingFile) {
        existingFile.name = newName;
      }
    },
    updateFolderName(state, action) {
      const { id, newName } = action.payload;
      const existingFolder = state.folders.find(folder => folder.id === id);
      if (existingFolder) {
        existingFolder.name = newName;
      }
    },
    deleteFile(state, action) {
      const fileId = action.payload;
      state.files = state.files.filter(file => file.id !== fileId);
    },
    deleteFolder(state, action) {
      const folderId = action.payload;
      state.folders = state.folders.filter(folder => folder.id !== folderId);
      state.files = state.files.filter(file => file.parentId !== folderId);
    },
    setActiveFile(state, action) {
      state.activeFileId = action.payload;
    },
  },
});

export const { addFolder, addFile, updateFile, updateFileName, updateFolderName, deleteFile, deleteFolder, setActiveFile } = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
