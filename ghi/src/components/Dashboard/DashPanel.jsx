import { useState, useEffect } from 'react'
import Card from './Card'

function DashPanel() {
    const [cards, setCards] = useState([])

    const fetchData = () => {
        fetch('http://localhost:4000/cards')
            .then((res) => res.json())
            .then((data) => {
                setCards(data)
            })
            .catch((e) => console.log(e.message))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className="dashoard section">
            <div className="row">
                <div className="col-lg-8">
                    <div className="col-lg-4">
                        <div className="row">
                            {cards &&
                                cards.length > 0 &&
                                cards.map((card) => (
                                    <Card key={card._id} card={card} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashPanel
