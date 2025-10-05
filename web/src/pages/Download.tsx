import { useState } from 'react'
import { tiktokService } from '../services/tiktok-api'
import './Download.css'

const Download = () => {
  const [url, setUrl] = useState('')
  const [version, setVersion] = useState<'v1' | 'v2' | 'v3'>('v1')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)

    try {
      const data = await tiktokService.downloadVideo(url, { version })

      if (data.status === 'error') {
        setError(data.message || 'Failed to download video')
      } else {
        setResult(data.result)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const renderResult = () => {
    if (!result) return null

    if (result.type === 'video' && result.video) {
      return (
        <div className="result-content">
          <h3>Video Information</h3>
          <div className="video-info">
            {result.author && (
              <div className="author-info">
                <img src={result.author.avatarThumb?.[0]} alt={result.author.nickname} />
                <div>
                  <p className="author-name">{result.author.nickname}</p>
                  <p className="author-username">@{result.author.username}</p>
                </div>
              </div>
            )}
            <p className="video-desc">{result.desc}</p>
            {result.statistics && (
              <div className="stats">
                <span>❤️ {result.statistics.likeCount?.toLocaleString()}</span>
                <span>💬 {result.statistics.commentCount?.toLocaleString()}</span>
                <span>📤 {result.statistics.shareCount?.toLocaleString()}</span>
                <span>▶️ {result.statistics.playCount?.toLocaleString()}</span>
              </div>
            )}
            <div className="download-links">
              <a
                href={result.video.playAddr?.[0] || result.video.downloadAddr?.[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Download Video
              </a>
              {result.music?.playUrl?.[0] && (
                <a
                  href={result.music.playUrl[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Download Audio
                </a>
              )}
            </div>
          </div>
        </div>
      )
    }

    if (result.type === 'image' && result.images) {
      return (
        <div className="result-content">
          <h3>Image Slideshow</h3>
          <div className="video-info">
            {result.author && (
              <div className="author-info">
                <img src={result.author.avatarThumb?.[0]} alt={result.author.nickname} />
                <div>
                  <p className="author-name">{result.author.nickname}</p>
                  <p className="author-username">@{result.author.username}</p>
                </div>
              </div>
            )}
            <p className="video-desc">{result.desc}</p>
            <div className="images-grid">
              {result.images.map((img: string, idx: number) => (
                <a href={img} target="_blank" rel="noopener noreferrer" key={idx}>
                  <img src={img} alt={`Slide ${idx + 1}`} />
                </a>
              ))}
            </div>
            {result.music?.playUrl?.[0] && (
              <div className="download-links">
                <a
                  href={result.music.playUrl[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Download Audio
                </a>
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="result-content">
        <h3>Download Result</h3>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    )
  }

  return (
    <div className="download-page container">
      <h1>Download TikTok Content</h1>
      <p className="page-description">
        Download videos, images, and audio from TikTok by pasting the URL below
      </p>

      <form onSubmit={handleDownload} className="download-form card">
        <div className="form-group">
          <label htmlFor="url">TikTok URL</label>
          <input
            id="url"
            type="text"
            className="input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.tiktok.com/@username/video/..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="version">Download Version</label>
          <select
            id="version"
            className="input"
            value={version}
            onChange={(e) => setVersion(e.target.value as 'v1' | 'v2' | 'v3')}
          >
            <option value="v1">V1 - TikTok API (Full Details)</option>
            <option value="v2">V2 - SSSTik</option>
            <option value="v3">V3 - MusicalDown</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Processing...' : 'Download'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}

      {result && renderResult()}
    </div>
  )
}

export default Download
