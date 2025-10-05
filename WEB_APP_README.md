# TikTok Browser Web Application

A modern web interface for the tiktok-api-dl library with user authentication and a beautiful UI.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Project
```bash
npm run build
```

This compiles both the TypeScript API and the React web application.

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Features

- **User Authentication** - Secure login and registration with Supabase
- **Video Download** - Download TikTok videos in multiple quality options
- **Search** - Search for users, videos, and live streams
- **Profile Browser** - View user profiles, posts, and statistics
- **Trending** - Discover trending creators and content
- **Collections & Playlists** - Browse TikTok collections and playlists
- **Cookie Management** - Securely store TikTok cookies for advanced features

## Important Note About API Integration

⚠️ **The web app UI is currently built but requires backend API integration to function.**

The TikTok API uses Node.js-specific modules (like `crypto`, `fs`, `https-proxy-agent`) that cannot run directly in a browser. To make the app fully functional, you need to:

### Option 1: Set Up Backend API Routes (Recommended for Production)

Create API endpoints (Express, Next.js API routes, or similar) that:
1. Accept requests from the frontend
2. Call the tiktok-api-dl functions on the server
3. Return results to the frontend

Example with Express:
```javascript
const express = require('express');
const TiktokAPI = require('@tobyg74/tiktok-api-dl');
const app = express();

app.get('/api/download', async (req, res) => {
  const { url, version } = req.query;
  const result = await TiktokAPI.Downloader(url, { version });
  res.json(result);
});

app.listen(3001);
```

Then update `web/src/services/tiktok-api.ts` to call your backend:
```typescript
export const tiktokService = {
  downloadVideo: async (url: string, options?: DownloadOptions) => {
    const response = await fetch(`/api/download?url=${url}&version=${options?.version || 'v1'}`);
    return await response.json();
  },
  // ... other methods
}
```

### Option 2: Use the CLI Tool

The tiktok-api-dl CLI works perfectly for command-line usage:
```bash
npm install -g @tobyg74/tiktok-api-dl
tiktokdl download "https://www.tiktok.com/@username/video/..."
```

## Project Structure

```
project/
├── src/                    # Original tiktok-api-dl backend code
│   ├── index.ts           # Main API exports
│   ├── services/          # TikTok service implementations
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
├── web/                   # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service wrappers
│   │   ├── hooks/         # React hooks
│   │   └── styles/        # CSS styles
│   └── index.html         # HTML entry point
├── lib/                   # Compiled JavaScript (after build)
└── dist/                  # Built web app (after build)
```

## Available Scripts

- `npm run build` - Build both API and web app
- `npm run build:api` - Build only the TypeScript API
- `npm run build:web` - Build only the React web app
- `npm run dev` - Start Vite development server
- `npm run preview` - Preview production build
- `npm run cli` - Run CLI tool

## Environment Variables

Create a `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## How to Use (When Backend is Connected)

### 1. Create an Account
- Click "Sign Up" in the header
- Enter your email and password
- Sign in to access features

### 2. Add TikTok Cookie (Optional)
- Go to Settings
- Follow the instructions to extract your TikTok cookie
- Paste and save it
- This enables features like searching videos/live streams and viewing liked content

### 3. Use Features
- **Download**: Paste a TikTok URL and download videos/images
- **Search**: Find users, videos, or live streams
- **Profile**: View any user's profile and content
- **Trending**: Discover popular creators
- **Collections**: Browse collections and playlists

## Deployment

### Build for Production
```bash
npm run build:web
```

The built files will be in the `dist/` folder. Deploy them to any static hosting service (Netlify, Vercel, etc.) along with your backend API.

## Tech Stack

- **Frontend**: React 19, React Router, Vite
- **Authentication**: Supabase Auth
- **Styling**: Custom CSS with TikTok-inspired design
- **Backend**: Node.js, TypeScript, Axios, Cheerio

## Troubleshooting

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Port Already in Use
- Vite will automatically use the next available port if 3000 is taken

### API Errors
- The current build uses placeholder API calls
- Set up a backend server to enable full functionality

## Contributing

This web app is built on top of the excellent [@tobyg74/tiktok-api-dl](https://github.com/TobyG74/tiktok-api-dl) library.

## License

ISC License - Same as the original tiktok-api-dl project
