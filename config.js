import config from './config.json'

const env = process.env["NODE_ENV"]
export default config[env]