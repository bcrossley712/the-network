import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

const baseQuery = {
  page: 1,
  query: ''
}
class PostsService {
  async getPosts(query) {
    baseQuery.query = query ? query : baseQuery.query
    const res = await api.get('api/posts', { params: baseQuery })
    logger.log('[getPosts]', res.data)
    AppState.postsObject = res.data
    AppState.posts = res.data.posts
  }
  async changePage(num) {
    baseQuery.page = baseQuery.page + num
    const res = await api.get('api/posts', { params: baseQuery })
    logger.log('[changePage]', res.data)
    AppState.postsObject = res.data
    AppState.posts = res.data.posts
  }
}
export const postsService = new PostsService()