import { useState } from 'react'
import { tiktokService } from '../services/tiktok-api'
import './Collections.css'

const Collections = () => {
  const [url, setUrl] = useState('')
  const [type, setType] = useState<'collection' | 'playlist'>('collection')
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [error, setError] = useState('')

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setItems([])
    setLoading(true)

    try {
      let data
      if (type === 'collection') {
        data = await tiktokService.getCollection(url, 1, 20)
      } else {
        data = await tiktokService.getPlaylist(url, 1, 20)
      }

      if (data.status === 'error') {
        setError(data.message || 'Failed to fetch items')
      } else {
        setItems(data.result?.itemList || [])
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="collections-page container">
      <h1>Collections & Playlists</h1>
      <p className="page-description">
        Browse TikTok collections and playlists by entering the URL or ID
      </p>

      <form onSubmit={handleFetch} className="collections-form card">
        <div className="type-selector">
          <button
            type="button"
            className={`type-btn ${type === 'collection' ? 'active' : ''}`}
            onClick={() => setType('collection')}
          >
            Collection
          </button>
          <button
            type="button"
            className={`type-btn ${type === 'playlist' ? 'active' : ''}`}
            onClick={() => setType('playlist')}
          >
            Playlist
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="url">
            {type === 'collection' ? 'Collection' : 'Playlist'} URL or ID
          </label>
          <input
            id="url"
            type="text"
            className="input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={`https://www.tiktok.com/@username/${type}/...`}
            required
          />
          <p className="help-text">
            Enter the full URL or just the ID
          </p>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Items'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}

      {items.length > 0 && (
        <div className="items-section">
          <h2>{items.length} items found</h2>
          <div className="items-grid">
            {items.map((item) => (
              <div key={item.id} className="item-card card">
                <div className="item-thumbnail">
                  {item.video?.cover ? (
                    <img src={item.video.cover} alt={item.desc} />
                  ) : (
                    <div className="no-thumbnail">No preview</div>
                  )}
                  {item.video?.duration && (
                    <div className="item-duration">{item.video.duration}s</div>
                  )}
                </div>
                <div className="item-info">
                  <p className="item-desc">{item.desc}</p>
                  {item.author && (
                    <div className="item-author">
                      <img src={item.author.avatarThumb} alt={item.author.nickname} />
                      <span>@{item.author.uniqueId}</span>
                    </div>
                  )}
                  {item.statistics && (
                    <div className="item-stats">
                      <span>❤️ {item.statistics.diggCount?.toLocaleString()}</span>
                      <span>💬 {item.statistics.commentCount?.toLocaleString()}</span>
                      <span>▶️ {item.statistics.playCount?.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && items.length === 0 && url && !error && (
        <div className="no-results">
          <p>No items found</p>
        </div>
      )}
    </div>
  )
}

export default Collections
