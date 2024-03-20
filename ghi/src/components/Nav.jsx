import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useGetTokenQuery, useLogoutMutation } from '../app/apiSlice'

const Nav = () => {
    const navigate = useNavigate()
    const { data: account, isLoading, isSuccess } = useGetTokenQuery()
    const [logout, logoutStatus] = useLogoutMutation()

    if (isLoading) {
        return <div>Loading....</div>
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-400 p-6 ">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">iRental</span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-center">
                <div className="text-sm lg:flex-grow">
                    <NavLink href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" style={{ textDecoration: "none" }} to={'/'}>Home</NavLink>
                    {!account && (
                        <NavLink href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" style={{ textDecoration: "none" }} to={'/signup'}>Sign Up </NavLink>
                    )}
                    {!account && (
                        <NavLink href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" style={{ textDecoration: "none" }} to={'/login'}>Log In</NavLink>
                    )}
                    <NavLink href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" style={{ textDecoration: "none" }} to={'/properties'}>Properties</NavLink>
                    {account && (
                        <NavLink href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" style={{ textDecoration: "none" }} to={'/createproperty'}>Create Property</NavLink>
                    )}
                    {account && (
                        <NavLink href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" style={{ textDecoration: "none" }} to={'/reservations'}>Reservations</NavLink>
                    )}
                    {account && (
                        <NavLink href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" style={{ textDecoration: "none" }} to={'/dashboard'}>Dashboard</NavLink>
                    )}
                </div>
                <div>
                    {account && (
                        <button
                            type="submit"
                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                            onClick={() => {
                                logout(),
                                navigate('/')
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>

    )
}

export default Nav
