import './Header.css'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Nav from "./Nav"

function Header() {
    return (
        <header
            id="dashboard-header" // Updated ID for specificity
            className="fixed-top d-flex align-items-center"
        >
            <Logo />
            <SearchBar />
            <Nav />
        </header>
    )
}

export default Header
