'use strict'

import SubforumAPI from '../utils/subforum'
import Reflux from 'reflux'

import SubforumAction from '../actions/subforum_action'
import Manager from '../../utils/manager'

export default Reflux.createStore({
  // On creation
  init () {
    this.listenTo(SubforumAction.listSubforums, this.onListSubforums)
    this.listenTo(SubforumAction.viewSubforum, this.onViewSubforum)
    this.listenTo(SubforumAction.updateSubforum, this.onUpdateSubforum)
    this.listenTo(SubforumAction.createSubforum, this.onCreateSubforum)
    this.listenTo(SubforumAction.deleteSubforum, this.onDeleteSubforum)
  },

  async onListSubforums () {
    try {
      console.log('trying to get a list of all subforums')
    	this.trigger(await SubforumAPI.all())
    } catch (error) {
      Manager.showError (error)
    }
  },

  async onViewSubforum (subforumId) {
    try {
      this.trigger(await SubforumAPI.view(subforumId))
    } catch (error) {
      Manager.showError (error)
    }
  },

  async onUpdateSubforum (subforumId, subforumUpdate) {
    try {
      this.trigger(await SubforumAPI.update(subforumId, subforumUpdate))
    } catch (error) {
      Manager.showError(error)
    }
  },

  async onCreateSubforum (newSubforum) {
    try {
      this.trigger(await SubforumAPI.create(newSubforum))
    } catch (error) {
      Manager.showError(error)
    }
  },

  async onDeleteSubforum (subforumId) {
    try {
      this.trigger(await SubforumAPI.del(subforumId))
    } catch (error) {
      Manager.showError(error)
    }
  }
})
