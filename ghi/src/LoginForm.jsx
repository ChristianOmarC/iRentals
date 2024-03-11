import { useState, useEffect } from 'react'
import { useLoginMutation } from './app/apiSlice'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [login, loginStatus] = useLoginMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (loginStatus.isSuccess) navigate('/')
        if (loginStatus.isError) setErrorMessage(loginStatus.error.message)
    }, [loginStatus, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        login({
            username,
            password,
        })
    }

    return (
        <div className="max-w-sm mx-auto my-10 p-5 border rounded-lg shadow-lg bg-white">
            <h5 className="text-xl font-semibold mb-4 text-center">Login</h5>
            {error && (
                <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Username:
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password:
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
