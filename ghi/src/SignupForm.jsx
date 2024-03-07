import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { login, register } from './services/auth'

function SignUpForm() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const { setToken } = useAuthContext()
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleRegistration = async (e) => {
        e.preventDefault()
        const accountData = {
            email,
            username,
            password,
            first_name,
            last_name,
        }

        try {
            await register(accountData)
            const token = await login(username, password)
            if (token) {
                setToken(token)
                navigate('/dashboard') // Talk with team about the
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                console.error('Registration error:', error)
                setErrorMessage('Failed to register. Please try again later.')
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
                {errorMessage && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded"
                        role="alert"
                    >
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleRegistration}>
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input"
                        />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                        />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                        />
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            autoComplete="given-name"
                            required
                            placeholder="First Name"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="input"
                        />
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            autoComplete="family-name"
                            required
                            placeholder="Last Name"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign Up
                        </button>
                        <div className="flex items-center justify-center mt-4">
                            <span className="mr-4">Or sign up with</span>
                            <img
                                src="google-icon.png"
                                alt="Sign up with Google"
                                className="w-8 h-8 cursor-pointer"
                            />
                            <img
                                src="facebook-icon.png"
                                alt="Sign up with Facebook"
                                className="w-8 h-8 cursor-pointer ml-2"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm
