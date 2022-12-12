import React from 'react'
import '../styles/error.css'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <>
            <section className="balance section">
                <div className="services__container container grid flexy">
                    <div>
                        <img src={`https://serebii.net/pokemon/art/702.png`} alt="" />
                        <div className="error">
                            Achoo !! You arrived at wrong page pal
                            <br />
                            But you can return from here safely
                            <br />
                            <Link
                            exact to="/" 
                            className="button error__buttons">
                                Go Back
                                <i className='uil uil-arrow-right'></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Error