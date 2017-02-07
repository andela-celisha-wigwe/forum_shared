'use strict'

import Reflux from 'reflux'

import AlertAction from '../actions/alert_action'

export default Reflux.createStore({
  // On creation
  init () {
    // List for every AlertRequestion action
    // And fire onAlertRequest with the data of the action
    this.listenTo(AlertAction.alertRequest, this.onAlertRequest)
    this.listenTo(AlertAction.alertError, this.onAlertError)
  },

  // Trigger all the listeners with the new alert
  onAlertRequest (alert) {
    this.trigger(alert)
  },

  // Trigger all the listeners with the new alert
  onAlertError (error) {
    this.trigger(error)
  }
})
