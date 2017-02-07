import API from './api.js'

// Do the same for post and message

export default {
  all (post) {
    return API.get(`/posts/${post}/messages`)
  },
  view (post, id) {
    return API.get(`/posts/${post}/messages/${id}`)
  },
  update (post, id, messageUpdate) {
    return API.put(`/posts/${post}/messages/${id}`, messageUpdate)
  },
  del (post, id) {
    return API.del(`/posts/${post}/messages/${id}`)
  },
  create (post, newMessage) {
    return API.post(`/posts/${post}/messages`, newMessage)
  }
}
