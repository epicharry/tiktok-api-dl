import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { tiktokService } from '../services/tiktok-api'
import './Trending.css'

const Trending = () => {
  const [creators, setCreators] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadTrendingCreators()
  }, [])

  const loadTrendingCreators = async () => {
    try {
      const data = await tiktokService.getTrendingCreators()
      if (data.status === 'error') {
        setError(data.message || 'Failed to load trending creators')
      } else {
        setCreators(data.result || [])
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="trending-page container">
      <h1>Trending Creators</h1>
      <p className="page-description">
        Discover the most popular creators on TikTok right now
      </p>

      {error && <div className="error">{error}</div>}

      {creators.length > 0 && (
        <div className="creators-grid">
          {creators.map((creator) => (
            <Link
              to={`/profile/${creator.username}`}
              key={creator.id}
              className="creator-card card"
            >
              <div className="creator-header">
                <img
                  src={creator.avatarThumb}
                  alt={creator.nickname}
                  className="creator-avatar"
                />
                {creator.verified && <span className="verified-badge">✓</span>}
              </div>
              <div className="creator-info">
                <h3>{creator.nickname}</h3>
                <p className="creator-username">@{creator.username}</p>
                {creator.description && (
                  <p className="creator-description">{creator.description}</p>
                )}
              </div>
              <div className="creator-stats">
                <div className="stat">
                  <span className="stat-value">
                    {creator.followerCount?.toLocaleString()}
                  </span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                  <span className="stat-value">
                    {creator.likeCount?.toLocaleString()}
                  </span>
                  <span className="stat-label">Likes</span>
                </div>
                <div className="stat">
                  <span className="stat-value">
                    {creator.videoCount?.toLocaleString()}
                  </span>
                  <span className="stat-label">Videos</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && creators.length === 0 && !error && (
        <div className="no-results">
          <p>No trending creators found</p>
        </div>
      )}
    </div>
  )
}

export default Trending
