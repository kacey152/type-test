import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className='navbar navbar-expand-lg' data-bs-theme="dark" /* changes the colour of toggler to white */ id='navColour'>
        <div className='container-fluid text-center'>
          <Link className='navbar-brand col-1' to="/">Type Test</Link>
          {/* Navigation bar toggler */}
          <button type='button' className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#navBar' aria-controls='#navBar' aria-expanded="false" aria-label='Toggle navigation'>
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navigation bar items */}
          <ul className='navbar-nav collapse navbar-collapse' id='navBar'>
            <li className='nav-item col-2'><Link className='nav-link' to="/leaderboards">Leaderboards</Link></li>
          </ul>
        </div>
    </nav>
  )
}

export default NavBar