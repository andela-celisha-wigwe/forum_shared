'use strict'

import Reflux from 'reflux'
import UserAPI from '../utils/user'

import UserAction from '../actions/user_action'
import AlertAction from '../actions/alert_action'

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
			// store the user's token in local storage
			window.localStorage.setItem('currentUser', JSON.stringify(authUser))
			this.trigger(authUser)
		})
		.catch(this.showError)
	},

	onUserLogout () {
		// window.localStorage.setItem('currentUser', null)
		window.localStorage.clear()
		this.trigger(false)
	},

	onUserRegister (registrationData) {
		UserAPI.register(registrationData)
		.then((newAuthUser) => {
			// store the user's token in local storage
			window.localStorage.setItem('currentUser', JSON.stringify(newAuthUser))
			this.trigger(newAuthUser)
		})
		.catch(this.showError)
	},

	onCheckLogin () {
		// check for the user's token in local storage
		// otherwise return false
		this.trigger(JSON.parse(window.localStorage.getItem('currentUser')) || false)
	},

	showError (err) {
		console.log(err, err.toString())
		const errorMessages = JSON.parse(err.text).join("\n")
		AlertAction.alertError(errorMessages)
	}
})

/**
 * On the home page, check for the current user,
 * if current user, then show users name
 * otherwise, show login and register
 */