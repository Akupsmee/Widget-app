import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import data from "./dataAccord"

const Accordion = (props) => {
    const [showItem, setShowItem] = useState(false)

    const handleClick = (index) => {

        if (showItem === index) {
            //if clicked question is already active, then close it
            setShowItem(null);
        } else {
            setShowItem(index);
        }
    }

    return (
        <main>
            <h2 style={{ position: "absolute", top: "80px" , color:"#eae6eb"}}>My Accordion</h2>
            <div className="container">
                <h3>questions about my tech stack</h3>
                <section className="info">

                    {
                        data.map(singleItem => {
                            const { id, title, info } = singleItem
                            return (
                                <article className="question" key={id}>

                                    <header>
                                        <h4>{title}</h4>
                                        <button className="btn" type="button" onClick={() => handleClick(id)}>
                                            {showItem === id ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                        </button>
                                    </header>
                                    {showItem === id && <p>{info}</p>}

                                </article>
                            )
                        })
                    }

                </section>

            </div>
        </main>

    );
}


export default Accordion
