import React, { useContext } from 'react'
import Home from './Home'
import Navbar from './Navbar'
import Leaderboard from './Leaderboard';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Pieces from './Pieces';
import Shadows from './Shadows';
import Error from './Error';

const Index = () => {
    
    const { currentUser } = useContext(AuthContext)

    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/leaderboard" element={currentUser ? <Leaderboard /> : <Login />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/pieces' element={currentUser ? <Pieces /> : <Login />} />
                    <Route exact path='/shadows' element={currentUser ? <Shadows /> : <Login />} />
                    <Route path= '*' element={<Error />} />
                </Routes>
            </Router>
        </>
    )
}

export default Index