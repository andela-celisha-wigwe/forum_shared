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

	onUserLogin (loginData) {
		UserAPI.login(loginData)
		.then((authUser) => {
			Manager.handleLogin(authUser)
		})
		.catch(Manager.showError)
	},

	onUserLogout () {
		Manager.handleLogout()
	},

	onUserRegister (registrationData) {
		UserAPI.register(registrationData)
		.then((newAuthUser) => {
			Manager.handleLogin(newAuthUser)
		})
		.catch(Manager.showError)
	},

	onCheckLogin () {
		this.trigger(Manager.checkLogin())
	}
})