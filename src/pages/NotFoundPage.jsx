// NotFoundPage.jsx — shown for all undefined routes (no Header rendered)
// Displays the invalid URL and a link back to Home
import { useLocation, Link } from 'react-router-dom'
import './NotFoundPage.css'

function NotFoundPage() {
  // Capture the invalid URL that triggered the 404
  const location = useLocation()

  return (
    <div className="notfound-page">
      {/* Decorative background */}
      <div className="notfound-bg" aria-hidden="true" />

      <div className="notfound-content">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">Page not found</h1>
        <p className="notfound-desc">
          The page at{' '}
          <code className="notfound-url">{location.pathname}</code>{' '}
          doesn't exist or has been moved.
        </p>
        {/* Link back to Home page */}
        <Link to="/" className="notfound-home-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
