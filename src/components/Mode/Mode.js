import React, {useState} from 'react'
import './Mode.css'
function Mode() {
    const [mode, setMode] = useState('timer')
    const [counter, setCounter] = useState(30)
  return (
    <div className='container text-center mode py-4'>
        <div className='row align-items-center'>
          <i className="bi bi-stopwatch col"></i>
          <span className='col'>{counter}</span>
          <i className="bi bi-arrow-clockwise col"></i>
        </div>
    </div>
  )
}

export default Mode