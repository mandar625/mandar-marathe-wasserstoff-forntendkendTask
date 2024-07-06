import React from 'react'
import "./App.css"
import Sidebar from './components/Sidebar'
import CodeEditorComponent from './components/CodeEditorComponent'

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <CodeEditorComponent/>  
    </div>
  )
}

export default App
