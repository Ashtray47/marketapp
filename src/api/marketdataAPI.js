'use strict';
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../dispatcher/actionTypes');

var DataHelper = require('./datahelper');

var newMarketData;

var mydata = DataHelper.getData.then(function(val) {
	newMarketData = val;
	return val;
});


var MarketDataAPI = {
	marketlist: newMarketData,
	addMarket: function(obj) {
		var marketObj = {};

		marketObj.id = Math.floor(Math.random() * 1000);
		marketObj.name = obj.name;
		marketObj.city = obj.city;
		marketObj.day = obj.day;
		marketObj.likes = 0;
		marketObj.comments = [];

		Dispatcher.dispatch({
			actionType: ActionTypes.ADD_MARKET,
			marketObj: marketObj
		});
	},
	searchMarketCity: function(obj) {
		var selectedCity = obj;

		return DataHelper.getMarket("api/:" + selectedCity).then(function(val) {

			var searchedMarket = [];
				for (var i=0; i < val.length; i++) {
					if (val[i].city.toLowerCase() === selectedCity.toLowerCase()) {
						searchedMarket.push(val[i])
					}
				}

			return val;
		});

	},
	searchCityList: function(city) {

		var cityStr = city.toLowerCase();
		var cityStrLength = city.length;
		var matchedCities = [];

		return DataHelper.getData.then(function(val) {

			var getTypedCities = function(data) {
				var datalength = data.length;
				// find all the matched cities
				for (var i=0; i < datalength; i++) {
					if (data[i].city.toLowerCase().substr(0, cityStrLength) === cityStr) {
						matchedCities.push(data[i].city)
					}
				}

				function uniq(arr) {
					var seen = {};
					return arr.filter(function(item) {
						return seen.hasOwnProperty(item) ? false : (seen[item] = true);
					});
				}

				var uniqueCities = uniq(matchedCities);

				var insertCityInfo = function(uniqueArr, totalArr) {
					var cityObject = [];
					var marketCount = 0;
					for (var i=0; i<uniqueArr.length; i++) {

						for (var j=0; j<totalArr.length; j++) {
							if (uniqueArr[i] === totalArr[j]) {
								marketCount = marketCount+1;
							}
						}

						cityObject.push( {id: i, city: uniqueArr[i], count: marketCount} )
						marketCount = 0;
					}
					return cityObject;
				};

				return insertCityInfo(uniqueCities,matchedCities);

			};

			return getTypedCities(val);

		})



		/*
			Dispatcher.dispatch({
				actionType: ActionTypes.GET_CITIES,
				searchCityInfo: searchCityInfo
			});
		*/
	},
	getMarketID: function(id) {

		return DataHelper.postData("api/items").then(function(val) {
			var marketId = {};

			var l = val.length;
			for(var i=0; i < l; i++) {
				if (val[i].id.toString() === id.toString() ) {
					marketId.id = val[i].id;
					marketId.name = val[i].name;
					marketId.city = val[i].city;
					marketId.day = val[i].day;
					marketId.comments = val[i].comments;
				}
			};

			return marketId;
		});

	},
	selectedMarketID: function(id) {
		return DataHelper.getMarket("api/id/:" + id).then(function(val) {
			return val;
		});

	},
	addCommentID: function(selectedEl, newComment) {
		var selectedMarket = {
			id: selectedEl,
			comment: newComment
		}

		DataHelper.putComment("api/items", selectedMarket).then(function(val) {

			Dispatcher.dispatch({
				actionType: ActionTypes.ADD_COMMENT,
				selectedMarket: selectedMarket
			});

		});

	}
}



module.exports = MarketDataAPI;





