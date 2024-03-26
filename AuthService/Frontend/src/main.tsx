import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './index.css'
import LoginForm from './loginForm/loginForm.tsx'
import SignupForm from "./signupForm/signupForm.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/auth/login" element={<LoginForm />} />
            <Route path="/auth/signup" element={<SignupForm />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
