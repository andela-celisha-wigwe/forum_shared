import request from 'superagent'
import config from '../config'
import Manager from '../../utils/manager'
console.log(config, "config")

export default {
  root: config.appUrl,
  async get (path) {
    return this.wrapCall(request.get(this.root + path))
  },
  async post (path, data) {
    // return this.wrapCall(request.post(this.root + path, data))
    console.log(await Manager.getHeaders(), "logging managers")
    return this.wrapCall(request.post(this.root + path, data), await Manager.getHeaders())
  },
  async del (path) {
    return this.wrapCall(request.del(this.root + path), await Manager.getHeaders())
  },
  async put (path, data) {
    return this.wrapCall(request.put(this.root + path, data), await Manager.getHeaders())
  },
  wrapCall (req, headers = {}) {
    return new Promise((resolve, reject) => {
      if (headers != {}) {
        Object.keys(headers).forEach((key) => {
          req.set(key, headers[key])
        })
      }
      console.log("checkign the number of requests here")
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
