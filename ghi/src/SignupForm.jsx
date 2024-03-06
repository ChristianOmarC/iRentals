import { useState } from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'
import { login, register } from './services/auth'

const SignupForm = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const { baseUrl, setToken } = useAuthContext()
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    // console.log(baseUrl)

    const handleRegistration = async (e) => {
        e.preventDefault()
        // It's very important to grab currentTarget now because
        // when this callback ends, the browser sets it to null
        const form = e.currentTarget
        const accountData = {
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: password,
            email: email,
        }
        try {
            await register(accountData)
            const token = await login(
                baseUrl,
                accountData.username,
                accountData.password
            )
            setToken(token)
            // Reset the form
            form.reset()
            navigate('/')
        } catch (e) {
            if (e instanceof Error) {
                setErrorMessage(e.message)
            }
            console.error('Error: Redirect', e)
        }
    }

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Signup</h5>
            <div className="card-body">
                <form onSubmit={handleRegistration}>
                    <div className="mb-3">
                        {errorMessage ? <p>{errorMessage}</p> : ''}
                        <label className="form-label">username</label>
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        {errorMessage ? <p>{errorMessage}</p> : ''}
                        <label className="form-label">First Name</label>
                        <input
                            name="first_name"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        {errorMessage ? <p>{errorMessage}</p> : ''}
                        <label className="form-label">Last Name</label>
                        <input
                            name="last_name"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">email</label>
                        <input
                            name="email"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <input
                            className="btn btn-primary"
                            type="submit"
                            value="Register"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupForm
