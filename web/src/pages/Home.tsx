import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const features = [
    {
      title: 'Download Videos',
      description: 'Download TikTok videos, images, and audio in high quality',
      icon: '⬇️',
      link: '/download',
    },
    {
      title: 'Search Content',
      description: 'Search for users, videos, and live streams',
      icon: '🔍',
      link: '/search',
    },
    {
      title: 'Trending',
      description: 'Discover trending content and creators',
      icon: '🔥',
      link: '/trending',
    },
    {
      title: 'Collections',
      description: 'Browse collections and playlists',
      icon: '📚',
      link: '/collections',
    },
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Explore TikTok Content</h1>
          <p className="hero-description">
            Download videos, browse profiles, search content, and discover trending creators
          </p>
          <div className="hero-actions">
            <Link to="/download" className="btn btn-primary">
              Start Downloading
            </Link>
            <Link to="/search" className="btn btn-secondary">
              Search Content
            </Link>
          </div>
        </div>
      </section>

      <section className="features container">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <Link to={feature.link} key={feature.title} className="feature-card card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="info container">
        <div className="info-card card">
          <h2>How It Works</h2>
          <ol className="info-list">
            <li>Create an account or sign in</li>
            <li>Optionally add your TikTok cookie for advanced features</li>
            <li>Use any feature: download videos, search users, browse trending content</li>
            <li>Enjoy seamless TikTok browsing experience</li>
          </ol>
        </div>
      </section>
    </div>
  )
}

export default Home
