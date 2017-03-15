import API = require('./api.js')

export default class {
  public static async all () : Promise<Object> {
    return await API.get('/subforums')
  }
  public static async view (id: String) : Promise<Object> {
    return await API.get(`/subforums/${id}`)
  }
  public static async update (id: String, subforumUpdate) : Promise<Object> {
    return await API.put(`/subforums/${id}`, subforumUpdate)
  }
  public static async del (id: String) : Promise<Object> {
    return await API.del(`/subforums/${id}`)
  }
  public static async create (newSubforum: Object) : Promise<Object> {
    return await API.post(`/subforums`, newSubforum)
  }
}
