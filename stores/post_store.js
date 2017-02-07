'use strict'

import Reflux from 'reflux'
import PostAPI from '../utils/post'

import PostAction from '../actions/post_action'
import Manager from '../../utils/manager'

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
  	.catch(Manager.showError)
  },

  onViewPost (subforum, postId) {
  	PostAPI.view(subforum, postId)
  	.then((post) => {
  		this.trigger(post)
  	})
  	.catch(Manager.showError)
  },

  onCreatePost (subforum, newPost) {
  	PostAPI.create(subforum, newPost)
  	.then((post) => {
  		this.trigger(post)
  	})
  	.catch(Manager.showError)
  },

  onUpdatePost (subforum, postId, postUpdate) {
  	PostAPI.update(subforum, postId, postUpdate)
  	.then((post) => {
  		this.trigger(post)
  	})
  	.catch(Manager.showError)
  },

  onDeletePost (subforum, postId) {
  	PostAPI.del(subforum, postId)
  	.then(() => {
  		this.trigger(true)
  	})
  	.catch(Manager.showError)
  }
})
