import React from 'react'

function NavBar() {
  return (
    <nav className='navbar navbar-expand-lg'>
        <a className='navbar-brand' href="">Type Test</a>
        {/* Navigation bar toggler */}
        <button type='button' className='navbar-toggle' data-bs-toggle='collapse' data-bs-target='#navBar' aria-controls='#navBar' aria-label='Toggle navigation'>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation bar items */}
        <ul className='nav navbar-nav collapse navbar-collapse'>
          {/* Drop down for Difficulty */}
          <li className='nav-item dropdown'>
            <button className='nav-link dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>Difficulty</button>
            <ul className='dropdown-menu'>
              <li><a href="" className='dropdown-item'>Easy</a></li>
              <li><a href="" className='dropdown-item'>Medium</a></li>
              <li><a href="" className='dropdown-item'>Difficult</a></li>
            </ul>
          </li>

          <li className='nav-item'><a className='nav-link' href="">Leaderboards</a></li>
        </ul>
    </nav>
  )
}

export default NavBar