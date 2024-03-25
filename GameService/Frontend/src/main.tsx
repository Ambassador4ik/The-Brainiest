import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GameSelector from "./GameSelector/gameSelector.tsx";
import NavigationPane from "./NavigationBar/navigationBar.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <NavigationPane></NavigationPane>
      <GameSelector></GameSelector>
  </React.StrictMode>,

)
