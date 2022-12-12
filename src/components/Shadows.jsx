import React, { useEffect, useState, useContext } from 'react'
import { db } from "../firebase.config";
import {
    collection,
    onSnapshot,
    doc,
    setDoc,
    updateDoc,
    addDoc,
    deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { increment } from 'firebase/firestore';
import '../styles/home.css'
import axios from 'axios'
import Loader from './Loader'
import { AuthContext } from '../context/AuthContext'

const Shadows = () => {

    const { currentUser } = useContext(AuthContext)


    const [sprite, setSprite] = useState("025")
    const [name, setName] = useState("pikachu");
    const [loading, setLoading] = useState(false);
    const [surrender, setSurrender] = useState(false);
    const [show, setShow] = useState(true);
    const [typed, setTyped] = useState("");

    const [error, setError] = useState(false);

    async function getData(num) {
        setLoading(true);
        let pokeData = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${num}/`
        ).catch(function (error) {
            setError(true)
        });
        setName(pokeData.data.name)
        setLoading(false);
        setSurrender(true);
    }

    const startGuess = () => {
        setShow(false);
        setSurrender(false);
        setTyped("");
        const num = Math.floor(Math.random() * 1009);
        if (num < 10) {
            setSprite(`00${num}`);
        }
        else if (num < 100) {

            setSprite(`0${num}`);
        }
        else {
            setSprite(`${num}`);
        }
        getData(num)
    }

    const onSurrender = () => {
        const userRef = doc(db, `users/${currentUser.uid}`);
        updateDoc(userRef, { attempted: increment(1) });
        setSurrender(false);
        setShow(true);
        setTyped("");
    }

    const submit = (event) => {

        event.preventDefault();

        const userRef = doc(db, `users/${currentUser.uid}`);
        updateDoc(userRef, { attempted: increment(1) });
        if (typed === name) {
            updateDoc(userRef, { accepted: increment(1) });
        }

        setTyped("");
        setShow(true)
        setSurrender(false)
    }


    return (
        <>
            <section className="section">
                <h2 className="section__title">Shady Spades</h2>
                <span className="section__subtitle">Recognise the Pokémons from their shadows</span>
                
                {
                    error &&
                    <div className="services__modal">
                        <div className="services__modal-content login__error__modal-content">
                            <h4 className="services__modal-title">PikáPedia <br /> Guidelines</h4>
                            <i
                                onClick={() => {
                                    setError(false);
                                }}
                                className="uil uil-times services__modal-close">
                            </i>
                            <div>
                                Extremely sorry for disturbance !! Please Close the modal and press start button again !! Piká
                            </div>
                        </div>
                    </div>
                }
                <div className="container initial__container">
                    <div className='flexy'>
                        {
                            surrender ?
                                <button
                                    onClick={() => { onSurrender() }}
                                >Surrender</button>
                                :
                                <button
                                    onClick={startGuess}
                                >Start</button>
                        }
                    </div>
                    <div className="flexy">
                        <div className="card">
                            {
                                (!name || loading)
                                    ?
                                    <Loader />
                                    :
                                    <>
                                        {


                                            show ?
                                                <>
                                                    <div className="services__content flexy piece__content mbb2">
                                                        <div className="front flexy">

                                                            <img
                                                                loading='lazy'
                                                                className='sup__img'
                                                                src={`https://serebii.net/pokemon/art/${sprite}.png`}
                                                                alt="pokemon.png" />
                                                        </div>
                                                    </div>
                                                    <div className='flexy verdict'>
                                                        {name.charAt(0).toUpperCase() + name.slice(1)}
                                                    </div>
                                                </> :
                                                <>
                                                    <div className="services__content mbb2">
                                                        <img
                                                            loading='lazy'
                                                            className='sup__img loader__img'
                                                            src={`https://serebii.net/pokemon/art/${sprite}.png`}
                                                            alt="pokemon.png" />
                                                    </div>
                                                    <form
                                                        onSubmit={submit}
                                                        className='services__form flexy'>

                                                        <div class="services__form-content pokemon__name-input">
                                                            <input
                                                                value={typed}
                                                                onChange={(event) => { setTyped(event.target.value.toLowerCase()) }}
                                                                required
                                                                placeholder="Enter Pokemon's name"
                                                                type="text" className="services__input" />
                                                        </div>
                                                        <button>Submit</button>

                                                    </form>

                                                </>
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Shadows