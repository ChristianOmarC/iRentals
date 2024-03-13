import React from 'react'

function NavNotice() {
    return (
        <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                    You have 4 new notifications
                    <a href="#">
                        <span className="badge rounded-pill bg-primary p-2 ms-2">
                            View all
                        </span>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                    <i className="bi bi-exclamation-circle text-warning"></i>
                    <div>
                        <h4>Cozy Lakefront Cabin</h4>
                        <p>
                            Enjoy the serenity of nature in our fully furnished
                            cabin, perfect for weekend getaways. Includes Wi-Fi,
                            a private dock, and a wood-fired sauna.
                        </p>
                        <p>Listed 30 min. ago</p>
                    </div>
                </li>

                <li>
                    <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                    <i className="bi bi-x-circle text-danger"></i>
                    <div>
                        <h4>Cozy Lakefront Cabin</h4>
                        <p>
                            Enjoy the serenity of nature in our fully furnished
                            cabin, perfect for weekend getaways. Includes Wi-Fi,
                            a private dock, and a wood-fired sauna.
                        </p>
                        <p>Listed 30 min. ago</p>
                    </div>
                </li>

                <li>
                    <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                    <i className="bi bi-check-circle text-success"></i>
                    <div>
                        <h4>Beachfront Luxury Villa</h4>
                        <p>
                            Wake up to stunning ocean views in our spacious
                            villa, featuring private beach access, an infinity
                            pool, and a personal chef service. Perfect for
                            family vacations or romantic getaways.
                        </p>
                        <p>Listed 1 hour ago</p>
                    </div>
                </li>

                <li>
                    <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                    <i className="bi bi-info-circle text-primary"></i>
                    <div>
                        <h4>Rustic Country Cottage</h4>
                        <p>
                            Escape to the countryside in our charming cottage.
                            Surrounded by lush gardens and walking trails, it's
                            the perfect retreat for nature lovers. Pet-friendly.
                        </p>
                        <p>Listed 2 hours ago</p>
                    </div>
                </li>

                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                    <a href="#">Show all notifications</a>
                </li>
            </ul>
        </li>
    )
}

export default NavNotice
