import TiktokAPI from '../../../src/index'

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

export const tiktokService = {
  downloadVideo: async (url: string, options?: DownloadOptions) => {
    return await TiktokAPI.Downloader(url, {
      version: options?.version || 'v1',
      proxy: options?.proxy,
      showOriginalResponse: options?.showOriginalResponse,
    })
  },

  search: async (keyword: string, options: SearchOptions) => {
    return await TiktokAPI.Search(keyword, options)
  },

  stalkUser: async (username: string, proxy?: string) => {
    return await TiktokAPI.StalkUser(username, { proxy })
  },

  getVideoComments: async (url: string, commentLimit?: number, proxy?: string) => {
    return await TiktokAPI.GetVideoComments(url, { commentLimit, proxy })
  },

  getUserPosts: async (username: string, postLimit?: number, proxy?: string) => {
    return await TiktokAPI.GetUserPosts(username, { postLimit, proxy })
  },

  getUserReposts: async (username: string, postLimit?: number, proxy?: string) => {
    return await TiktokAPI.GetUserReposts(username, { postLimit, proxy })
  },

  getUserLiked: async (username: string, cookie: string, postLimit?: number, proxy?: string) => {
    return await TiktokAPI.GetUserLiked(username, { cookie, postLimit, proxy })
  },

  getCollection: async (collectionIdOrUrl: string, page?: number, count?: number, proxy?: string) => {
    return await TiktokAPI.Collection(collectionIdOrUrl, { page, count, proxy })
  },

  getPlaylist: async (playlistIdOrUrl: string, page?: number, count?: number, proxy?: string) => {
    return await TiktokAPI.Playlist(playlistIdOrUrl, { page, count, proxy })
  },

  getTrending: async (proxy?: string) => {
    return await TiktokAPI.Trending({ proxy })
  },

  getTrendingCreators: async (proxy?: string) => {
    return await TiktokAPI.TrendingCreators({ proxy })
  },

  getVideosByMusicId: async (musicId: string, page?: number, count?: number, proxy?: string) => {
    return await TiktokAPI.GetVideosByMusicId(musicId, { page, count, proxy })
  },
}
