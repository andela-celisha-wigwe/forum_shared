import request from 'superagent'
import config from '../config'
import Manager from '../../utils/manager'

export default {
  root: config.appUrl,
  get (path) {
    return this.wrapCall(request.get(this.root + path))
  },
  post (path, data) {
    // const headers = window.localStorage.getItem('currentUser')
    // ? { Authorization: `Token ${JSON.parse(window.localStorage.getItem('currentUser')).auth_token}` }
    // : {}
    const headers = Manager.getItem()
    return this.wrapCall(request.post(this.root + path, data), headers)
  },
  del (path) {
    // const headers = window.localStorage.getItem('currentUser')
    // ? { Authorization: `Token ${JSON.parse(window.localStorage.getItem('currentUser')).auth_token}` }
    // : {}
    const headers = Manager.getItem()
    return this.wrapCall(request.del(this.root + path), headers)
  },
  put (path, data) {
    // const headers = window.localStorage.getItem('currentUser')
    // ? { Authorization: `Token ${JSON.parse(window.localStorage.getItem('currentUser')).auth_token}` }
    // : {}
    const headers = Manager.getItem()
    return this.wrapCall(request.put(this.root + path, data), headers)
  },
  wrapCall (req, headers = {}) {
    return new Promise((resolve, reject) => {
      if (headers != {}) {
        Object.keys(headers).forEach((key) => {
          req.set(key, headers[key])
        })
      }
      req
      .withCredentials(true)
      .end((err, res) => {
        if (err || res.statusCode >= 400) {
          console.log(err)
          return reject(Object.assign(res || {}, { err }))
        }
        resolve(res.body)
      })
    })
  }
}
