/* Navbar.jsx — top navigation bar with links to Home, Browse Books, Add Book */
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner page-container">
        {/* Brand logo */}
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">⊛</span>
          <span className="brand-name">Libraria</span>
        </Link>

        {/* Navigation links */}
        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link--active' : 'nav-link'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link--active' : 'nav-link'
            }
          >
            Browse Books
          </NavLink>
          <NavLink
            to="/add-book"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link--cta' : 'nav-link nav-link--cta'
            }
          >
            <span>+ Add Book</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
