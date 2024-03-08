import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation } from './app/apiSlice'
import signupImage from './assets/signupImage.jpg'


function SignUpForm() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [signup, signupStatus] = useSignupMutation()
    

    useEffect(() => {
        if (signupStatus.isSuccess) navigate ('/')
        if (signupStatus.isError) setErrorMessage(signupStatus)
    }, [signupStatus])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password != passwordConfirmation) {
            setErrorMessage("Password does not match")
        } else {
            signup({
                first_name,
                last_name,
                email,
                username,
                password,
                

            })
        }
    };

     return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col md:flex-row bg-grey-100 shadow-xl">
                {/* Left side with image */}

                <div
                    className="md:w-96 h-auto md:h-auto self-stretch bg-cover bg-no-repeat bg-center"
                    style={{ backgroundImage: `url(${signupImage})` }}
                >
                    {/* Image is set via background-image */}
                </div>
                {/* Right side with form */}
                <div className="p-10">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl font-bold text-center mb-10">
                            Create Account
                        </h2>

                        {/* Social Media Sign Up */}
                        {/* <div className="flex justify-center gap-4 mb-5">
                            <button className="bg-blue-500 text-white rounded py-2 px-4 flex items-center justify-center space-x-2">
                                <FaGoogle />
                                <span>Sign up with Google</span>
                            </button>
                            <button className="bg-blue-700 text-white rounded py-2 px-4 flex items-center justify-center space-x-2">
                                <FaFacebook />
                                <span>Sign up with Facebook</span>
                            </button>
                        </div> */}

                        <div className="flex items-center justify-center my-5">
                            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2 mx-2"></span>
                            <span className="flex-none uppercase text-xs text-gray-400 whitespace-nowrap">
                                or
                            </span>
                            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2 mx-2"></span>
                        </div>

                        {/* Sign Up Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-green-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-green-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-green-500"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-green-500"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-green-500"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password Confirmation"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-green-500"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition duration-200 ease-in-out"
                            >
                                Submit
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <a
                                href="#"
                                className="text-green-600 hover:underline"
                            >
                                Log in
                            </a>
                        </p>
                        {errorMessage && (
                            <p className="text-center text-red-500 mt-2">
                                {errorMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm
