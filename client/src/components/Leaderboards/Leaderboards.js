import React, { useEffect } from 'react'
import "./Leaderboards.css"
import { useState } from 'react'
import { getLeaderboards } from '../../api/api'


const Leaderboards = () => {
    const [leaderboardEntries, setLeaderboardEntries] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await getLeaderboards();
                const sortedData = response.data.sort((a,b) => b.wpm - a.wpm) //descending order
                setLeaderboardEntries(sortedData);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [])

    return (
        <div className='container'>
            <h2 className='row justify-content-center pt-5'>Leaderboards</h2>
            <table className="table table-striped table-bordered text-center">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col" className='leaderboardCol'>Name</th>
                        <th scope="col" className='leaderboardColSmall'>Words per minute</th>
                        <th scope="col" className='leaderboardCol'>Mode</th>
                    </tr>
                </thead>
                <tbody >
                    {leaderboardEntries.map((entry, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{entry.name}</td>
                                <td>{entry.wpm}</td>
                                <td>{entry.mode === "time" ? "Timed" : entry.mode === "words" ? "Words" : ""}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboards