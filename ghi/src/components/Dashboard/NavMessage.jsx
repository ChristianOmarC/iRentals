import React from 'react'

function NavMessage() {
    return (
        <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                    You have 3 new messages
                    <a href="#">
                        <span className="badge rounded-pill bg-primary p-2 ms-2">
                            View all
                        </span>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                    <a href="#">
                        <img
                            src="assets/img/client-1.jpg"
                            alt=""
                            className="rounded-circle"
                        />
                        <div>
                            <h4>Jordan Lee</h4>
                            <p>
                                Is the beachfront villa still available for the
                                upcoming holiday weekend?
                            </p>
                            <p>2 hrs. ago</p>
                        </div>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                    <a href="#">
                        <img
                            src="assets/img/client-2.jpg"
                            alt=""
                            className="rounded-circle"
                        />
                        <div>
                            <h4>Samantha Avery</h4>
                            <p>
                                Can you provide more details about the amenities
                                in the downtown studio?
                            </p>
                            <p>5 hrs. ago</p>
                        </div>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                    <a href="#">
                        <img
                            src="assets/img/client-3.jpg"
                            alt=""
                            className="rounded-circle"
                        />
                        <div>
                            <h4>Maxwell Jacob</h4>
                            <p>
                                I'm interested in the country cottage. Are pets
                                allowed?
                            </p>
                            <p>1 day ago</p>
                        </div>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>

                <li className="dropdown-footer">
                    <a href="#">Show all messages</a>
                </li>
            </ul>
        </li>
    )
}

export default NavMessage
