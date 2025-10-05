import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Layout from './components/Layout'
import Home from './pages/Home'
import Download from './pages/Download'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Trending from './pages/Trending'
import Collections from './pages/Collections'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'
import './styles/global.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="download" element={<Download />} />
            <Route path="search" element={<Search />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="trending" element={<Trending />} />
            <Route path="collections" element={<Collections />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
