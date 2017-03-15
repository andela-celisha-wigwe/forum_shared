// import API from './api.js'
import API = require('./api.js')

export default class {
  public static all (post: String) : Promise<Object> {
    return API.get(`/posts/${post}/messages`)
  }
  public static view (post: String, id: String) : Promise<Object> {
    return API.get(`/posts/${post}/messages/${id}`)
  }
  public static update (post: String, id: String, messageUpdate: Object) : Promise<Object> {
    return API.put(`/posts/${post}/messages/${id}`, messageUpdate)
  }
  public static del (post: String, id: String) : Promise<Object> {
    return API.del(`/posts/${post}/messages/${id}`)
  }
  public static create (post: String, newMessage: Object) : Promise<Object> {
    return API.post(`/posts/${post}/messages`, newMessage)
  }
}