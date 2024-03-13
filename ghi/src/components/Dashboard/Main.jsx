import DashPanel from './DashPanel'
import PageTitle from './PageTitle'
import './main.css'
function Main() {
    return (
        <main id="main" className="main">
            <PageTitle page="Dashboard" />
            <DashPanel />
        </main>
    )
}

export default Main
