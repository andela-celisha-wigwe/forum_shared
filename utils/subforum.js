import API from './api.js'

// Do the same for post and message

export default {
  all () {
    return API.get('/subforums')
  },
  view (id) {
    return API.get(`/subforums/${id}`)
  },
  update (id, subforumUpdate) {
    return API.put(`/subforums/${id}`, subforumUpdate)
  },
  del (id) {
    return API.del(`/subforums/${id}`)
  },
  create (newSubforum) {
    return API.post(`/subforums`, newSubforum)
  }
}
