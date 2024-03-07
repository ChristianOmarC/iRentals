import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submitting to API')
        navigate('/')
    }
    return (
        <>
            <h1 className="text-3xl">About</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name
                        <br />
                        <input type="text" placeholder="Name" />
                    </label>
                </div>
                <div>
                    <label>
                        Email
                        <br />
                        <input type="email" placeholder="Email" />
                    </label>
                </div>
                <div>
                    <button type="submit">Contact Us</button>
                </div>
            </form>
        </>
    )
}

export default About
