'use strict'

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../dispatcher/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var DataHelper = require('../api/datahelper');

var CHANGE_EVENT = 'change';

var CommentStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	}
});

Dispatcher.register(function(payload) {
	switch(payload.actionType) {
		case ActionTypes.ADD_COMMENT:
			CommentStore.emitChange();

		break;
		default:
			// does nothing
	}
})


module.exports = CommentStore;

