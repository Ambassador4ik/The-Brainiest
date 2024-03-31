import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
//import BlitzMode from "./GameModes/BlitzMode/blitzMode.tsx";
import BlitzModeMainScreen from "./GameModes/BlitzModeMainScreen/blitzModeMainScreen.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BlitzModeMainScreen roomId={"840auv"}></BlitzModeMainScreen>
  </React.StrictMode>,
)