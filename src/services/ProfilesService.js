import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {
  async getProfile(id) {
    const res = await api.get('api/profiles/' + id)
    logger.log('[getProfile]', res.data)
    AppState.activeProfile = res.data
  }
  async getProfilePosts(id) {
    const res = await api.get(`api/profiles/${id}/posts`)
    logger.log('[getProfilePosts]', res.data)
    AppState.postsObject = res.data
    AppState.posts = res.data.posts
  }
}
export const profilesService = new ProfilesService()