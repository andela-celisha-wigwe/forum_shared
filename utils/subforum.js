import API from './api.js'

// Do the same for post and message

export default {
  async all () {
    return await API.get('/subforums')
  },
  async view (id) {
    return await API.get(`/subforums/${id}`)
  },
  async update (id, subforumUpdate) {
    return await API.put(`/subforums/${id}`, subforumUpdate)
  },
  async del (id) {
    return await API.del(`/subforums/${id}`)
  },
  async create (newSubforum) {
    return await API.post(`/subforums`, newSubforum)
  }
}
