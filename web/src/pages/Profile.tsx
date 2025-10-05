import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { tiktokService } from '../services/tiktok-api'
import './Profile.css'

const Profile = () => {
  const { username } = useParams<{ username: string }>()
  const [profile, setProfile] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'posts' | 'reposts'>('posts')

  useEffect(() => {
    if (username) {
      loadProfile()
      loadPosts()
    }
  }, [username])

  const loadProfile = async () => {
    try {
      const data = await tiktokService.stalkUser(username!)
      if (data.status === 'error') {
        setError(data.message || 'Failed to load profile')
      } else {
        setProfile(data.result)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const loadPosts = async () => {
    try {
      const data = await tiktokService.getUserPosts(username!, 30)
      if (data.status === 'success') {
        setPosts(data.result || [])
      }
    } catch (err) {
      console.error('Failed to load posts:', err)
    }
  }

  const loadReposts = async () => {
    try {
      const data = await tiktokService.getUserReposts(username!, 30)
      if (data.status === 'success') {
        setPosts(data.result || [])
      }
    } catch (err) {
      console.error('Failed to load reposts:', err)
    }
  }

  const handleTabChange = (tab: 'posts' | 'reposts') => {
    setActiveTab(tab)
    if (tab === 'reposts') {
      loadReposts()
    } else {
      loadPosts()
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container">
        <p>Profile not found</p>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="container">
          <div className="profile-info">
            <img
              src={profile.user?.avatar}
              alt={profile.user?.nickname}
              className="profile-avatar"
            />
            <div className="profile-details">
              <h1>{profile.user?.nickname}</h1>
              <p className="profile-username">@{profile.user?.username}</p>
              {profile.user?.signature && (
                <p className="profile-bio">{profile.user.signature}</p>
              )}
              {profile.user?.verified && (
                <span className="verified-badge">✓ Verified</span>
              )}
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">
                {profile.stats?.followerCount?.toLocaleString()}
              </span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {profile.stats?.followingCount?.toLocaleString()}
              </span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {profile.stats?.heartCount?.toLocaleString()}
              </span>
              <span className="stat-label">Likes</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {profile.stats?.videoCount?.toLocaleString()}
              </span>
              <span className="stat-label">Videos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content container">
        <div className="profile-tabs">
          <button
            className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => handleTabChange('posts')}
          >
            Posts
          </button>
          <button
            className={`tab ${activeTab === 'reposts' ? 'active' : ''}`}
            onClick={() => handleTabChange('reposts')}
          >
            Reposts
          </button>
        </div>

        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card card">
              <div className="post-thumbnail">
                {post.video ? (
                  <img src={post.video.cover} alt={post.desc} />
                ) : post.imagePost?.images ? (
                  <img src={post.imagePost.images[0]} alt={post.desc} />
                ) : (
                  <div className="no-thumbnail">No preview</div>
                )}
              </div>
              <div className="post-info">
                <p className="post-desc">{post.desc}</p>
                <div className="post-stats">
                  <span>❤️ {post.stats?.likeCount?.toLocaleString()}</span>
                  <span>💬 {post.stats?.commentCount?.toLocaleString()}</span>
                  <span>▶️ {post.stats?.playCount?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="no-posts">
            <p>No {activeTab} found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
