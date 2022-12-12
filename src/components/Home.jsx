import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <>
            <section className="section">
                <h2 className="section__title">PikáPedia</h2>
                <span className="section__subtitle">Dive into the world of Pokémons</span>
                <div className="contact__container container grid">

                    <div>
                        <div className="services__content home__content">
                            <div>
                                <i className="uil uil-spade services__icon"></i>
                                <h3 className="services__title">Shady<br /> Spades</h3>
                            </div>
                            <Link
                                to={`/shadows`}
                                className="button button--flex button--small button--link services__button">
                                View More
                                <i className="uil uil-arrow-right button__icon"></i>
                            </Link>
                        </div>
                    </div>


                    <div>
                        <div className="services__content home__content">
                            <div>
                                <i className="uil uil-diamond services__icon"></i>
                                <h3 className="services__title">Diamond<br /> Pieces</h3>
                            </div>
                            <Link
                                to={`/pieces`}
                                className="button button--flex button--small button--link services__button">
                                View More
                                <i className="uil uil-arrow-right button__icon"></i>
                            </Link>
                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}

export default Home