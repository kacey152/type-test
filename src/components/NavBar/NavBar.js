import React from 'react'
import './NavBar.css'

function NavBar() {
  return (
    <nav className='navbar navbar-expand-lg' data-bs-theme="dark" /* changes the colour of toggler to white */ id='navColour'>
        <div className='container-fluid text-center'>
          <a className='navbar-brand col-1' href="">Type Test</a>
          {/* Navigation bar toggler */}
          <button type='button' className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#navBar' aria-controls='#navBar' aria-expanded="false" aria-label='Toggle navigation'>
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navigation bar items */}
          <ul className='navbar-nav collapse navbar-collapse' id='navBar'>
            {/* Drop down for Difficulty */}
            <li className='nav-item dropdown col-2 d-flex justify-content-center'>
              <button className='nav-link dropdown-toggle text-center' data-bs-toggle='dropdown' aria-expanded='false'>Difficulty</button>
              <ul className='dropdown-menu'>
                <li><a href="" className='dropdown-item'>Easy</a></li>
                <li><a href="" className='dropdown-item'>Medium</a></li>
                <li><a href="" className='dropdown-item'>Difficult</a></li>
              </ul>
            </li>
            <li className='nav-item col-2'><a className='nav-link' href="">Leaderboards</a></li>
          </ul>
        </div>
    </nav>
  )
}

export default NavBar