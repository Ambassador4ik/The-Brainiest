import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import UserProfile from "./UserProfile/userProfile.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <UserProfile></UserProfile>
  </React.StrictMode>,
)
