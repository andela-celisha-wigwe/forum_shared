import API from './api.js'

export default {
	async login (loginData) {
		return await API.post('/login', loginData)
	},

	async register (registrationData) {
		return await API.post('/register', registrationData)
	}
}