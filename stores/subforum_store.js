'use strict'

import SubforumAPI from '../utils/subforum'
import Reflux from 'reflux'

import SubforumAction from '../actions/subforum_action'
import AlertAction from '../actions/alert_action'

export default Reflux.createStore({
  // On creation
  init () {
    this.listenTo(SubforumAction.listSubforums, this.onListSubforums)
    this.listenTo(SubforumAction.viewSubforum, this.onViewSubforum)
    this.listenTo(SubforumAction.updateSubforum, this.onUpdateSubforum)
    this.listenTo(SubforumAction.createSubforum, this.onCreateSubforum)
    this.listenTo(SubforumAction.deleteSubforum, this.onDeleteSubforum)
  },

  onListSubforums () {
  	SubforumAPI.all()
  	.then((subforums) => {
  		this.trigger(subforums)
  	})
  	.catch(this.showError)
  },

  onViewSubforum (subforumId) {
  	SubforumAPI.view(subforumId)
  	.then((subforum) => {
  		this.trigger(subforum)
  	})
  	.catch(this.showError)
  },

  onUpdateSubforum (subforumId, subforumUpdate) {
    SubforumAPI.update(subforumId, subforumUpdate)
  	.then((subforum) => {
  		this.trigger(subforum)
  	})
  	.catch(this.showError)
  },

  onCreateSubforum (newSubforum) {
    SubforumAPI.create(newSubforum)
  	.then((subforum) => {
  		this.trigger(subforum)
  	})
  	.catch(this.showError)
  },

  onDeleteSubforum (subforumId) {
    SubforumAPI.del(subforumId)
  	.then(() => {
  		this.trigger(true)
  	})
  	.catch(this.showError)
  },

  showError (err) {
  	AlertAction.alertError(`There was a problem. ${err}`)
  }
})
