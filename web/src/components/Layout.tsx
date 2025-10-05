import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Layout.css'

const Layout = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content container">
          <Link to="/" className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M26.5 11.5c-2.5 0-4.5-2-4.5-4.5V4h-4v15c0 2.5-2 4.5-4.5 4.5S9 21.5 9 19s2-4.5 4.5-4.5c.5 0 1 .1 1.5.2V10c-.5-.1-1-.1-1.5-.1-5 0-9 4-9 9s4 9 9 9 9-4 9-9V11.9c2 1.3 4.4 2.1 7 2.1V10c-.5 0-1 .1-1.5.2-.5.1-1 .3-1.5.5V7c0-2.5 2-4.5 4.5-4.5V4c-2.5 0-4.5 2-4.5 4.5v3z" fill="currentColor"/>
            </svg>
            <span>TikTok Browser</span>
          </Link>

          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/download" className="nav-link">Download</Link>
            <Link to="/search" className="nav-link">Search</Link>
            <Link to="/trending" className="nav-link">Trending</Link>
            <Link to="/collections" className="nav-link">Collections</Link>
          </nav>

          <div className="header-actions">
            {user ? (
              <>
                <Link to="/settings" className="btn btn-secondary">Settings</Link>
                <button onClick={handleSignOut} className="btn btn-secondary">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <p>Built with tiktok-api-dl</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
