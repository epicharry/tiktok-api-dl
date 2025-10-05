import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import './Settings.css'

const Settings = () => {
  const { user } = useAuth()
  const [cookie, setCookie] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSaveCookie = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      localStorage.setItem('tiktok_cookie', cookie)
      setSuccess('Cookie saved successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to save cookie')
    }
  }

  const handleLoadCookie = () => {
    const savedCookie = localStorage.getItem('tiktok_cookie')
    if (savedCookie) {
      setCookie(savedCookie)
      setSuccess('Cookie loaded from storage')
      setTimeout(() => setSuccess(''), 3000)
    } else {
      setError('No saved cookie found')
    }
  }

  const handleDeleteCookie = () => {
    localStorage.removeItem('tiktok_cookie')
    setCookie('')
    setSuccess('Cookie deleted successfully')
    setTimeout(() => setSuccess(''), 3000)
  }

  return (
    <div className="settings-page container">
      <h1>Settings</h1>

      <div className="settings-section card">
        <h2>Account Information</h2>
        <div className="info-row">
          <span className="label">Email:</span>
          <span className="value">{user?.email}</span>
        </div>
        <div className="info-row">
          <span className="label">User ID:</span>
          <span className="value">{user?.id}</span>
        </div>
      </div>

      <div className="settings-section card">
        <h2>TikTok Cookie</h2>
        <p className="section-description">
          Add your TikTok cookie to enable features like searching videos/live streams and viewing liked videos.
        </p>

        <div className="cookie-instructions">
          <h3>How to get your TikTok Cookie:</h3>
          <ol>
            <li>Install the Cookie-Editor extension for your browser</li>
            <li>Go to tiktok.com and log in to your account</li>
            <li>Click the Cookie-Editor extension icon</li>
            <li>Click "Export" and copy all cookies</li>
            <li>Paste the cookies in the field below</li>
          </ol>
        </div>

        {success && <div className="success">{success}</div>}
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSaveCookie} className="cookie-form">
          <div className="form-group">
            <label htmlFor="cookie">TikTok Cookie</label>
            <textarea
              id="cookie"
              className="input cookie-input"
              value={cookie}
              onChange={(e) => setCookie(e.target.value)}
              placeholder="Paste your TikTok cookie here..."
              rows={6}
            />
          </div>

          <div className="cookie-actions">
            <button type="submit" className="btn btn-primary">
              Save Cookie
            </button>
            <button type="button" onClick={handleLoadCookie} className="btn btn-secondary">
              Load Saved Cookie
            </button>
            <button type="button" onClick={handleDeleteCookie} className="btn btn-secondary">
              Delete Cookie
            </button>
          </div>
        </form>
      </div>

      <div className="settings-section card">
        <h2>Features Requiring Cookie</h2>
        <ul className="features-list">
          <li>Search videos and live streams</li>
          <li>View user liked videos</li>
          <li>Access private or restricted content</li>
        </ul>
        <p className="note">
          Note: Your cookie is stored locally in your browser and is never sent to our servers.
        </p>
      </div>
    </div>
  )
}

export default Settings
