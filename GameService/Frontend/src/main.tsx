import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import BlitzMode from "./GameModes/BlitzMode/blitzMode.tsx";
//import BlitzModeMainScreen from "./GameModes/BlitzModeMainScreen/blitzModeMainScreen.tsx";
//import Room from "./GameModes/BlitzModeMainScreen/blitzModeMainScreen.tsx";
//<Room wsUrl={'ws://localhost:3002/game/840auv'} roomId={'840auv'}></Room>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BlitzMode></BlitzMode>
  </React.StrictMode>,
)