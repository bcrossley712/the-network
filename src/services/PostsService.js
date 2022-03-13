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
    baseQuery.query = ''
  }
  async changePage(num) {
    baseQuery.page = baseQuery.page + num
    const res = await api.get('api/posts', { params: baseQuery })
    logger.log('[changePage]', res.data)
    AppState.postsObject = res.data
    AppState.posts = res.data.posts
  }
  async createPost(data) {
    const res = await api.post('api/posts', data)
    logger.log('[createPost]', res.data)
    AppState.posts = [res.data, ...AppState.posts]
  }
  async removePost(id) {
    const res = await api.delete('api/posts/' + id)
    logger.log('[deletePost]', res.data)
    AppState.posts = AppState.posts.filter(p => p.id != id)
  }
  async submitLike(id) {
    let index = AppState.posts.findIndex(p => p.id == id)
    const res = await api.post(`api/posts/${id}/like`)
    logger.log('[submitLike]', res.data)
    AppState.posts.splice(index, 1, res.data)
  }
}
export const postsService = new PostsService()