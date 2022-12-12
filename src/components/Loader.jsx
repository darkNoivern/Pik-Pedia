import React, { useState, useEffect } from 'react'
import '../styles/home.css'

const Loader = () => {
    const url = ['https://serebii.net/pokemon/art/025.png', 'https://serebii.net/pokemon/art/001.png', 'https://serebii.net/pokemon/art/004.png', 'https://serebii.net/pokemon/art/007.png'];
    const [x, setX] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setX((x + 1) % 4);
        }, 100);
        // clearing interval
        return () => clearInterval(timer);
    });

    return (
        <>
            <div className="services__content">
                <img className='loader__img' src={url[x]} alt="pokemon.png" />
            </div>
        </>
    )
}

export default Loader