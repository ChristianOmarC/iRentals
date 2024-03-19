import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import navList from './navList';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './sideBar.css'
function SideBar() {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');

    // Function to open the modal with specific content
    const handleOpenModal = (nav) => {
        setModalTitle(nav.name);
        setModalContent(nav.description || 'No additional information.');
        setShowModal(true);
    };

    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    {/* Static items can remain as they are */}
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    {/* Dynamically generated list items */}
                    {navList.map((nav) => (
                        <li className="nav-item" key={nav._id}>
                            <button className="nav-link btn btn-link collapsed" onClick={() => handleOpenModal(nav)}>
                                <i className={nav.icon}></i>
                                <span>{nav.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SideBar;
