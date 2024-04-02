import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import GameSelector from "./GameSelector/gameSelector.tsx";
import BlitzMode from "./GameModes/BlitzMode/blitzMode.tsx";
import Room from "./GameModes/BlitzModeMainScreen/blitzModeMainScreen.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/game/" element={<GameSelector />} />
                <Route path="/game/blitz" element={<BlitzMode />} />
                <Route path="/game/room/:roomId" element={<Room wsUrl='ws://localhost:3002/game/' />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
