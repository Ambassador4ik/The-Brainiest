import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './index.css'
import MainPage from "./mainPage/mainPage.tsx";
import RatingsPage from "./ratingsPage/ratingsPage.tsx";
import AboutPage from "./aboutPage/aboutPage.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/ratings/" element={<RatingsPage />} />
                <Route path="/about/" element={<AboutPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
