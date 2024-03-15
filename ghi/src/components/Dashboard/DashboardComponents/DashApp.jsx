import React from 'react'
import './dashApp.css'

import './dashboard.css'
import Header from './Header'
//Import Icons
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import SideBar from './SideBar'
import Main from './Main'

function DashApp() {
    return (
        <>
            <Header />
            <SideBar />
            <Main />
        </>
    )
}

export default DashApp