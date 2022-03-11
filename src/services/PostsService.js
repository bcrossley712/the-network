import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async getPosts(query = {}) {
    const res = await api.get('api/posts')
    logger.log('[getPosts]', res.data)
    AppState.posts = res.data.posts
  }
}
export const postsService = new PostsService()