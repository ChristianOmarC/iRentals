import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'


const API_HOST = import.meta.env.VITE_API_HOST
const API_URL = import.meta.env.VITE_APP_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

const App = () => {
    return (
        <div>
            <Nav />

            <Outlet />
            {/* footer & other components */}
        </div>
    )
}
export default App

//import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import SignupForm from './SignupForm'
// import LoginForm from './LoginForm'
// import LandingPage from './LandingPage'
// import './index.css'

// console.table(import.meta.env)


// function App() {
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
