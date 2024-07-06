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

export const { addFolder, addFile, updateFile, deleteFile, deleteFolder , setActiveFile } = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
