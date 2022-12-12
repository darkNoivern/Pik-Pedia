import React, { useContext } from 'react'
import '../styles/leaderboard.css'
import { db } from "../firebase.config";
import { useState, useEffect } from "react";
import {
    collection,
    onSnapshot,
    doc,
    setDoc,
    addDoc,
    deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';

const Leaderboard = () => {

    const { currentUser } = useContext(AuthContext)

    const [userlist, setUserlist] = useState([]);
    const chatCollectionRef = collection(db, "users");
    const sortRef = query(chatCollectionRef, orderBy("attempted", "desc"));
    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            setUserlist(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });
    }, []);
    return (
        <>
            <section className="section">
                <h2 className="section__title">Leaderboard</h2>
                <span className="section__subtitle less__margin__subtitle">Complete against the world</span>

                <div className="flexy">

                    <div class="leaderboard-table">
                        <div className="table__head grid grid4">

                            <div>Username</div>
                            <div>Accepted</div>
                            <div>Attempted</div>
                            <div>Accuracy</div>
                        </div>
                        {
                            userlist.sort(function (first, second) {
                                const a1 = new Array(2).fill(0);

                                if (first.attempted > 0) {
                                    a1[0] = first.accepted / first.attempted;
                                }
                                if (second.attempted > 0) {
                                    a1[1] = second.accepted / second.attempted;
                                }

                                if (a1[0] > a1[1]) {
                                    return -1;
                                }
                                if (a1[0] < a1[1]) {
                                    return 1;
                                }

                                return 0;
                            }).map((user, index) => {
                                return (
                                    <>
                                        <div className='user__table grid grid4'>
                                            <div className='text-center'>{user.displayName}</div>
                                            <div className='text-center'>{user.accepted}</div>
                                            <div className='text-center'>{user.attempted}</div>

                                            <div className='text-center'>{user.attempted === 0 ? '0.00' : ((user.accepted*100) / user.attempted).toFixed(2)} %</div>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                </div>

            </section>
        </>
    )
}

export default Leaderboard