// import config from '../../config.json'
import config = require('../../config.json');

const env: String = process.env["NODE_ENV"] || ENV || "development"
console.log(env, "env")

export default config[env]