import Nav from "./components/Nav"
// import './App.css'
// import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import SignupForm from './SignupForm'
// import LoginForm from './LoginForm'
// import LandingPage from './LandingPage'

// // All your environment variables in vite are in this object
// console.table(import.meta.env)

// // When using environment variables, you should do a check to see if
// // they are defined or not and throw an appropriate error message
// const API_HOST = import.meta.env.VITE_API_HOST
// const API_URL = import.meta.env.VITE_APP_API_HOST

// if (!API_HOST) {
//     throw new Error('VITE_API_HOST is not defined')
// }

const App = () => {
    return (
        <div>
            <h1>Hello</h1>
        </div>

    )




}
//     return (
//         <Router>
//             <AuthProvider baseUrl={API_URL}>
//                 <Routes>
//                     <Route path="/" element={<LandingPage />} />
//                     <Route path="/signup" element={<SignupForm />} />
//                     <Route path="/login" element={<LoginForm />} />
//                 </Routes>
//             </AuthProvider>
//         </Router>
//     )
// }

export default App
