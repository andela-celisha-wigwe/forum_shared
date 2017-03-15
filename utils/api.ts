// import request from 'superagent'
// import config from '../config'
// import Manager from '../../utils/manager'

import request = require('superagent')
import config = require('../config')
import Manager = require('../../utils/manager')

export default class {
  public static root: String = config.appUrl

  public static async get (path: String) : Promise<Object> {
    // return a promise that later returns an object
    // {} is not the best becase if the promise should return an array, it is still and object and it is not what we want.
    return this.wrapCall(request.get(this.root + path))
  }

  public static async post (path: String, data: Object) : Promise<Object> {
    // return this.wrapCall(request.post(this.root + path, data))
    console.log(await Manager.getHeaders(), "logging managers")
    return this.wrapCall(request.post(this.root + path, data), await Manager.getHeaders())
  }

  public static async del (path: String) : Promise<Object> {
    return this.wrapCall(request.del(this.root + path), await Manager.getHeaders())
  }

  public static async put (path: String, data: Object) : Promise<Object> {
    return this.wrapCall(request.put(this.root + path, data), await Manager.getHeaders())
  }

  private static wrapCall (req: Object, headers: Object = {}) {
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