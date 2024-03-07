import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { useState } from 'react'
import './styles.css'
const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuthContext() // Assuming login is correctly implemented in the context to handle authentication

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('') // Clear any existing errors
        try {
            const success = await login(username, password)
            if (!success) {
                setError(
                    'Login failed. Please check your username and password.'
                )
            }
        } catch (error) {
            setError(error.message || 'An unexpected error occurred.')
            console.error('Login error:', error)
        }
    }

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Login</h5>
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username:
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
