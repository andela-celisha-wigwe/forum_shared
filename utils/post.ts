import API = require('./api.js')

export default class {
  public static all (subforum: String) : Promise<Object> {
    return API.get(`/subforums/${subforum}/posts`)
  }
  public static view (subforum: String, id: String) : Promise<Object> {
    return API.get(`/subforums/${subforum}/posts/${id}`)
  }
  public static update (subforum: String, id: String, postUpdate: Object) : Promise<Object> {
    return API.put(`/subforums/${subforum}/posts/${id}`, postUpdate)
  }
  public static del (subforum: String, id: String) : Promise<Object> {
    return API.del(`/subforums/${subforum}/posts/${id}`)
  }
  public static create (subforum: String, newPost: Object) : Promise<Object> {
    return API.post(`/subforums/${subforum}/posts`, newPost)
  }
}