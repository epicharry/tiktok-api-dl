import { useState } from 'react'
import { Link } from 'react-router-dom'
import { tiktokService } from '../services/tiktok-api'
import './Search.css'

type SearchType = 'user' | 'video' | 'live'

const Search = () => {
  const [keyword, setKeyword] = useState('')
  const [searchType, setSearchType] = useState<SearchType>('user')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState('')
  const [cookie, setCookie] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResults([])
    setLoading(true)

    try {
      const data = await tiktokService.search(keyword, {
        type: searchType,
        cookie: cookie || undefined,
      })

      if (data.status === 'error') {
        setError(data.message || 'Search failed')
      } else {
        setResults(data.result || [])
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const renderUserResults = () => (
    <div className="results-grid">
      {results.map((user: any) => (
        <Link to={`/profile/${user.username}`} key={user.uid} className="user-card card">
          <img src={user.avatarThumb} alt={user.nickname} className="user-avatar" />
          <div className="user-info">
            <h3>{user.nickname}</h3>
            <p className="username">@{user.username}</p>
            {user.signature && <p className="bio">{user.signature}</p>}
            <div className="user-stats">
              <span>{user.followerCount?.toLocaleString()} followers</span>
              {user.isVerified && <span className="verified">✓ Verified</span>}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )

  const renderVideoResults = () => (
    <div className="results-grid">
      {results.map((video: any) => (
        <div key={video.id} className="video-card card">
          <div className="video-thumbnail">
            <img src={video.video?.cover} alt={video.desc} />
            <div className="video-duration">{video.video?.duration}s</div>
          </div>
          <div className="video-info">
            <Link to={`/profile/${video.author?.uniqueId}`} className="video-author">
              <img src={video.author?.avatarThumb} alt={video.author?.nickname} />
              <div>
                <p className="author-name">{video.author?.nickname}</p>
                <p className="author-username">@{video.author?.uniqueId}</p>
              </div>
            </Link>
            <p className="video-desc">{video.desc}</p>
            <div className="video-stats">
              <span>❤️ {video.stats?.likeCount?.toLocaleString()}</span>
              <span>💬 {video.stats?.commentCount?.toLocaleString()}</span>
              <span>▶️ {video.stats?.playCount?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderLiveResults = () => (
    <div className="results-grid">
      {results.map((live: any) => (
        <div key={live.id} className="live-card card">
          <div className="live-thumbnail">
            <img src={live.cover?.[0]} alt={live.title} />
            <div className="live-badge">LIVE</div>
            <div className="live-viewers">{live.stats?.viewerCount?.toLocaleString()} watching</div>
          </div>
          <div className="live-info">
            <h3>{live.title}</h3>
            <Link to={`/profile/${live.owner?.username}`} className="live-owner">
              <img src={live.owner?.avatarThumb?.[0]} alt={live.owner?.nickname} />
              <div>
                <p className="owner-name">{live.owner?.nickname}</p>
                <p className="owner-username">@{live.owner?.username}</p>
              </div>
            </Link>
            {live.hashtag && <p className="live-hashtag">#{live.hashtag}</p>}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="search-page container">
      <h1>Search TikTok</h1>
      <p className="page-description">
        Search for users, videos, and live streams on TikTok
      </p>

      <form onSubmit={handleSearch} className="search-form card">
        <div className="search-tabs">
          <button
            type="button"
            className={`tab ${searchType === 'user' ? 'active' : ''}`}
            onClick={() => setSearchType('user')}
          >
            Users
          </button>
          <button
            type="button"
            className={`tab ${searchType === 'video' ? 'active' : ''}`}
            onClick={() => setSearchType('video')}
          >
            Videos
          </button>
          <button
            type="button"
            className={`tab ${searchType === 'live' ? 'active' : ''}`}
            onClick={() => setSearchType('live')}
          >
            Live Streams
          </button>
        </div>

        <div className="form-group">
          <input
            type="text"
            className="input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={`Search for ${searchType}...`}
            required
          />
        </div>

        {(searchType === 'live' || searchType === 'video') && (
          <div className="form-group">
            <label htmlFor="cookie">TikTok Cookie (Required for search)</label>
            <input
              id="cookie"
              type="text"
              className="input"
              value={cookie}
              onChange={(e) => setCookie(e.target.value)}
              placeholder="Paste your TikTok cookie here"
            />
            <p className="help-text">
              Cookie is required for video and live stream searches. Get it from Settings.
            </p>
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}

      {results.length > 0 && (
        <div className="search-results">
          <h2>{results.length} results found</h2>
          {searchType === 'user' && renderUserResults()}
          {searchType === 'video' && renderVideoResults()}
          {searchType === 'live' && renderLiveResults()}
        </div>
      )}

      {!loading && results.length === 0 && keyword && (
        <div className="no-results">
          <p>No results found for "{keyword}"</p>
        </div>
      )}
    </div>
  )
}

export default Search
