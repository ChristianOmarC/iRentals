import './sideBar.css'
// import navList from '../Dashboard/navList'
import navList from './navList'

function SideBar() {
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <a className="nav-link " href="/">
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li className="nav-item">
                    <ul
                        id="forms-nav"
                        className="nav-content collapse "
                        data-bs-parent="#sidebar-nav"
                    >
                    </ul>
                </li>
                {/* <li className="nav-heading">Pages</li> */}
                {navList.map((nav) => (
                    <li className="nav-item" key={nav._id}>
                        <a className="nav-link collapsed" href="#">
                            <i className={nav.icon}></i>
                            <span>{nav.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </aside >
    )
}

export default SideBar
