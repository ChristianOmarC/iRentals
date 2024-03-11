import { Link, NavLink } from 'react-router-dom'
import { useGetTokenQuery, useLogoutMutation } from '../app/apiSlice'


const Nav = () => {
    const { data: account, isLoading } = useGetTokenQuery()
    const [ logout , logoutStatus ] = useLogoutMutation()
    console.log(logoutStatus)

    if (isLoading) return <div>Loading....</div>
    return (
        <ul>
            <li>
                <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
                <NavLink to={'/signup'}>Sign Up </NavLink>
            </li>
            <li>
                <NavLink to={'/login'}>Log In</NavLink>
            </li>

            <li>
                <NavLink to={'/about'}>About</NavLink>
            </li>
            <li>
                <NavLink to={'/properties'}>Properties</NavLink>
            </li>
            {account && (
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition duration-200 ease-in-out"
                    onClick={() => {
                        logout()
                    }}
                >
                    Logout
                </button>
            )}
        </ul>
    )
}

export default Nav
