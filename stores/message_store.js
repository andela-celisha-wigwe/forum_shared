'use strict'

import Reflux from 'reflux'
import MessageAPI from '../utils/message'

import MessageAction from '../actions/message_action'
import AlertAction from '../actions/alert_action'

export default Reflux.createStore({
	init () {
		this.listenTo(MessageAction.listMessages, this.onListMessages)
		this.listenTo(MessageAction.viewMessage, this.onViewMessage)
		this.listenTo(MessageAction.createMessage, this.onCreateMessage)
		this.listenTo(MessageAction.updateMessage, this.onUpdateMessage)
		this.listenTo(MessageAction.deleteMessage, this.onDeleteMessage)
	},

	onListMessages (post) {
		MessageAPI.all(post)
		.then((messages) => {
			this.trigger(messages)
		})
		.catch(this.showError)
	},

	onViewMessage (post, messageId) {
		MessageAPI.view(post, messageId)
		.then((message) => {
			this.trigger(message)
		})
		.catch(this.showError)
	},

	onCreateMessage (post, newMessage) {
		MessageAPI.create(post, newMessage)
		.then((message) => {
			this.trigger(message)
		})
		.catch(this.showError)
	},

	onUpdateMessage (post, messageId, messageUpdate) {
		MessageAPI.update(post, messageId, messageUpdate)
		.then((message) => {
			this.trigger(message)
		})
		.catch(this.showError)
	},

	onDeleteMessage (post, messageId) {
		MessageAPI.update(post, messageId)
		.then(() => {
			this.trigger(true)
		})
		.catch(this.showError)
	},

	showError (err) {
		AlertAction.alertError(`There was a problem. ${err}`)
	}
})