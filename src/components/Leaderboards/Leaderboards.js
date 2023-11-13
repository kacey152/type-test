import React, { useEffect } from 'react'
import "./Leaderboards.css"
import { useState } from 'react'
import { getLeaderboards } from '../../api/api'


const Leaderboards = () => {
    const [leaderboardEntries, setLeaderboardEntries] = useState([])
    useEffect(() => {
        getLeaderboards()
            .then((response) => {
                setLeaderboardEntries(response.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className='container'>
            <h2 className='row justify-content-center pt-5'>Leaderboards</h2>
            <table class="table table-striped table-bordered text-center">
                <thead>
                    <tr>
                        <th scope="col" className='leaderboardCol'>Name</th>
                        <th scope="col" className='leaderboardColSmall'>Words per minute</th>
                        <th scope="col" className='leaderboardCol'>Mode</th>
                    </tr>
                </thead>
                <tbody >
                    {leaderboardEntries.map((entry) => {
                        return (
                            <tr>
                                <td>{entry.name}</td>
                                <td>{entry.wpm}</td>
                                <td>{entry.mode}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboards