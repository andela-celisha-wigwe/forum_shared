import API from './api.js'

export default class {
	public static async login (loginData: Object) : Promise<Object> {
		return await API.post('/login', loginData)
	},

	public static async register (registrationData: Object) : Promise<Object> {
		return await API.post('/register', registrationData)
	}
}