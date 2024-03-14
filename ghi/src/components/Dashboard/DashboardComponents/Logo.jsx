import './Logo.css'
// import image from '../Dashboard/assets/items/Logo.png'

function Logo() {
    const handleToggleSideBar = () => {
        document.body.classList.toggle('toggle-sidebar')
    }
    return (
        <div className="d-flex align-items-center justify-content-between">
            <a href="#" className="logo d-flex align-items-center">
                {/* <img src={image} alt="" className="Logo_Img" /> */}
                <span className="d-none d-lg-block">Dashboard</span>
            </a>
            <i
                className="bi bi-list toggle-sidebar-btn"
                onClick={handleToggleSideBar}
            ></i>
        </div>
    )
}

export default Logo
