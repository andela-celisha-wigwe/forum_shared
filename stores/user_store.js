'use strict'

import Reflux from 'reflux'
import UserAPI from '../utils/user'

import UserAction from '../actions/user_action'
import AlertAction from '../actions/alert_action'
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
			Manager.storeAuthUser('currentUser', JSON.stringify(authUser))
			// switch (App.type) {
			// 	case "WEB":
			// 		window.localStorage.setItem('currentUser', JSON.stringify(authUser))
			// 		this.trigger(authUser)
			// 		break;
			// 	case "MOBILE":
			// 		Manager.setItem('currentUser', JSON.stringify(authUser))
			// 		break;
			// 	default:
			// 		break
			// }
			// store the user's token in local storage
		})
		.catch(Manager.showError)
	},

	onUserLogout () {
		Manager.storeAuthUser('currentUser', "")
		// window.localStorage.setItem('currentUser', null)
		// Manager.setItem('currentUser', "")
		// window.localStorage.clear()
		this.trigger(false)
	},

	onUserRegister (registrationData) {
		UserAPI.register(registrationData)
		.then((newAuthUser) => {
			Manager.storeAuthUser('currentUser', JSON.stringify(newAuthUser))
			// store the user's token in local storage
			// Manager.setItem('currentUser', JSON.stringify(newAuthUser))
			// window.localStorage.setItem('currentUser', JSON.stringify(newAuthUser))
			// this.trigger(newAuthUser)
		})
		.catch(Manager.showError)
	},

	onCheckLogin () {
		// check for the user's token in local storage
		// otherwise return false
		this.trigger(JSON.parse(Manager.getItem('currentUser')) || false)
		// this.trigger(JSON.parse(window.localStorage.getItem('currentUser')) || false)
	},

	// showError (err) {
	// 	// Manager.showError()
	// 	console.log(err, "this is the error")
	// 	// console.log(err, err.toString())
	// 	// const errorMessages = JSON.parse(err.text).join("\n")
	// 	// AlertAction.alertError(errorMessages)
	// }
})

/**
 * On the home page, check for the current user,
 * if current user, then show users name
 * otherwise, show login and register
 */