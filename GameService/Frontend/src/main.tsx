import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import BlitzMode from "./GameModes/BlitzMode/blitzMode.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BlitzMode></BlitzMode>
  </React.StrictMode>,

)
