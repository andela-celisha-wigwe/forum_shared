import config from '../../config.json'

const env = process.env["NODE_ENV"] || ENV || "development"
console.log(env, "env")

export default config[env]