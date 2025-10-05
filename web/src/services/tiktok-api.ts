// Browser-compatible TikTok API service
// NOTE: This requires backend API integration in production
// The TikTok API cannot run directly in the browser due to Node.js dependencies

export interface DownloadOptions {
  version?: 'v1' | 'v2' | 'v3'
  proxy?: string
  showOriginalResponse?: boolean
}

export interface SearchOptions {
  type: 'user' | 'live' | 'video'
  cookie?: string
  page?: number
  proxy?: string
}

const API_ERROR = {
  status: 'error' as const,
  message: 'This feature requires a backend server. The TikTok API uses Node.js modules that cannot run in the browser. Please set up a backend API server to use this feature.',
}

export const tiktokService = {
  downloadVideo: async (url: string, options?: DownloadOptions) => {
    console.warn('Download video called - requires backend API')
    return API_ERROR
  },

  search: async (keyword: string, options: SearchOptions) => {
    console.warn('Search called - requires backend API')
    return API_ERROR
  },

  stalkUser: async (username: string, proxy?: string) => {
    console.warn('Stalk user called - requires backend API')
    return API_ERROR
  },

  getVideoComments: async (url: string, commentLimit?: number, proxy?: string) => {
    console.warn('Get comments called - requires backend API')
    return API_ERROR
  },

  getUserPosts: async (username: string, postLimit?: number, proxy?: string) => {
    console.warn('Get user posts called - requires backend API')
    return API_ERROR
  },

  getUserReposts: async (username: string, postLimit?: number, proxy?: string) => {
    console.warn('Get user reposts called - requires backend API')
    return API_ERROR
  },

  getUserLiked: async (username: string, cookie: string, postLimit?: number, proxy?: string) => {
    console.warn('Get user liked called - requires backend API')
    return API_ERROR
  },

  getCollection: async (collectionIdOrUrl: string, page?: number, count?: number, proxy?: string) => {
    console.warn('Get collection called - requires backend API')
    return API_ERROR
  },

  getPlaylist: async (playlistIdOrUrl: string, page?: number, count?: number, proxy?: string) => {
    console.warn('Get playlist called - requires backend API')
    return API_ERROR
  },

  getTrending: async (proxy?: string) => {
    console.warn('Get trending called - requires backend API')
    return API_ERROR
  },

  getTrendingCreators: async (proxy?: string) => {
    console.warn('Get trending creators called - requires backend API')
    return API_ERROR
  },

  getVideosByMusicId: async (musicId: string, page?: number, count?: number, proxy?: string) => {
    console.warn('Get videos by music called - requires backend API')
    return API_ERROR
  },
}
