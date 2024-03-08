import { useState, useEffect } from 'react'
import './styles.css'
import { useLoginMutation } from './app/apiSlice'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [ login, loginStatus ] = useLoginMutation()
    const navigate = useNavigate()


    useEffect(() => {
        if (loginStatus.isSuccess) navigate ('/')
        if (loginStatus.isError) setErrorMessage(loginStatus)
    }, [loginStatus])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('login')
        login({
            username,
            password
        })
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
