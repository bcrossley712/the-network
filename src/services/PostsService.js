import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async getPosts(query) {
    const res = await api.get('api/posts', { params: { query } })
    logger.log('[getPosts]', res.data)
    AppState.postsObject = res.data
    AppState.posts = res.data.posts
  }
  async changePage(url) {
    const res = await api.get(url)
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