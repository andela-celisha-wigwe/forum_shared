'use strict'

import Reflux from 'reflux'
import PostAPI from '../utils/post'

import PostAction from '../actions/post_action'
import AlertAction from '../actions/alert_action'

export default Reflux.createStore({
  init () {
    this.listenTo(PostAction.listPosts, this.onListPosts)
    this.listenTo(PostAction.viewPost, this.onViewPost)
    this.listenTo(PostAction.createPost, this.onCreatePost)
    this.listenTo(PostAction.updatePost, this.onUpdatePost)
    this.listenTo(PostAction.deletePost, this.onDeletePost)
  },

  onListPosts (subforum) {
  	PostAPI.all(subforum)
  	.then((posts) => {
  		this.trigger(posts)
  	})
  	.catch(this.showError)
  },

  onViewPost (subforum, postId) {
  	PostAPI.view(subforum, postId)
  	.then((post) => {
  		this.trigger(post)
  	})
  	.catch(this.showError)
  },

  onCreatePost (subforum, newPost) {
  	PostAPI.create(subforum, newPost)
  	.then((post) => {
  		this.trigger(post)
  	})
  	.catch(this.showError)
  },

  onUpdatePost (subforum, postId, postUpdate) {
  	PostAPI.update(subforum, postId, postUpdate)
  	.then((post) => {
  		this.trigger(post)
  	})
  	.catch(this.showError)
  },

  onDeletePost (subforum, postId) {
  	PostAPI.del(subforum, postId)
  	.then(() => {
  		this.trigger(true)
  	})
  	.catch(this.showError)
  },

  showError (err) {
  	AlertAction.alertError(`There was a problem. ${err}`)
  }
})
