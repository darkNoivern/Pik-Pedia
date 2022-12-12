import React, { useContext } from 'react'
import Home from './Home'
import Navbar from './Navbar'
import Leaderboard from './Leaderboard';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Index = () => {
    
    const { currentUser } = useContext(AuthContext)

    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={currentUser ? <Home /> : <Login />} />
                    <Route exact path="/leaderboard" element={currentUser ? <Leaderboard /> : <Login />} />
                    <Route exact path='/login' element={<Login />} />
                </Routes>
            </Router>
        </>
    )
}

export default Index