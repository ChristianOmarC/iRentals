import './dashboard.css'

import Cards from './Cards'

function Dashboard() {
    return (
        <section className="section dashboard">
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        <Cards />
                        {/* <div className="col-12"></div>
                        <div className="col-12"></div>
                        <div className="col-12"></div> */}
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </section>
    )
}

export default Dashboard
