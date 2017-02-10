'use strict'

import Reflux from 'reflux'
import UserAPI from '../utils/user'

import UserAction from '../actions/user_action'
import Manager from '../../utils/manager'

export default Reflux.createStore({
	init () {
		this.listenTo(UserAction.userLogin, this.onUserLogin)
		this.listenTo(UserAction.userLogout, this.onUserLogout)
		this.listenTo(UserAction.userRegister, this.onUserRegister)
		this.listenTo(UserAction.checkLogin, this.onCheckLogin)
	},

	async onUserLogin (loginData) {
		try {
			const authUser = await UserAPI.login(loginData)
			Manager.handleLogin(authUser)
			this.trigger(authUser)
		} catch (error) {
			Manager.showError(error)
		}
	},

	onUserLogout () {
		Manager.handleLogout()
		this.trigger(false)
	},

	async onUserRegister (registrationData) {
		UserAPI.register(registrationData)
		.then((newAuthUser) => {
			Manager.handleLogin(newAuthUser)
		})
		.catch(Manager.showError)
	},

	async onCheckLogin () {
		this.trigger( await Manager.checkLogin())
	}
})