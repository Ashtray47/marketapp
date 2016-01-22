'use strict'
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../dispatcher/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var DataHelper = require('../api/datahelper');

var CHANGE_EVENT = 'change';

var MarketStore = assign({}, EventEmitter.prototype, {
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
		case ActionTypes.ADD_MARKET:

			DataHelper.postData("api/items",payload.marketObj).then(function(item) {
				MarketStore.emitChange();
			});
		case ActionTypes.GET_CITIES:

			MarketStore.emitChange();
			break;
		default:
			// does nothing
	}
})


module.exports = MarketStore;

