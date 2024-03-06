// This makes VSCode check types as if you are using TypeScript
//@ts-check
// import { useState, useEffect } from 'react'
// import ErrorNotification from './ErrorNotification'
// import Construct from './Construct'

import './App.css'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import LandingPage from './LandingPage'

// All your environment variables in vite are in this object
console.table(import.meta.env)

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST
const API_URL = import.meta.env.VITE_APP_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

function App() {
    return (
        <Router>
            <AuthProvider baseUrl={API_URL}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/login" element={<LoginForm />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App
