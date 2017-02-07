import API from './api.js'

export default {
	login (loginData) {
		return API.post('/login', loginData)
	},

	register (registrationData) {
		return API.post('/register', registrationData)
	}
}