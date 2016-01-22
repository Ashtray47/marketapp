//datahelper.js
'use strict';

var xhr = new XMLHttpRequest();

var getData = new Promise(function(resolve, reject) {
	var url = "/api/items";
/*
	xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var myData =  JSON.parse(xhr.responseText);
				resolve(myData);
			}
	}
*/
	xhr.onload = function() {
		if (xhr.status === 200) {
			var myData = JSON.parse(xhr.responseText);
			resolve(myData);
		}
	}

	xhr.open("GET", url, true);
	xhr.send();

});


var postData = function(url, item) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();

		xhr.onload = function() {
			if (xhr.status === 200) {
				var myData = JSON.parse(xhr.responseText);
				resolve(myData);
			}
		}

		xhr.open('POST',url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

		if (item) {
			xhr.send(JSON.stringify(item));
		}
		else {
			xhr.send();
		}

	})

}

var putComment = function(url,commentInfo) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();

		xhr.onload = function() {
			if (xhr.status === 200) {
				var myData = JSON.parse(xhr.responseText);
				resolve(myData);
			}
		}

		xhr.open('PUT',url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

		if (commentInfo) {
			xhr.send(JSON.stringify(commentInfo));
		}
		else { xhr.send(); }


	})
}

var getMarket = function(url) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();

		xhr.onload = function() {
			if (xhr.status === 200) {
				var myData = JSON.parse(xhr.responseText);
				resolve(myData);
			}
		}

		xhr.open("GET", url, true);
		xhr.send();
	})
}

var getCities = function(url, cityString) {

	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();

		xhr.onload = function() {
			if (xhr.status === 200) {
				var myData = JSON.parse(xhr.responseText);
				resolve(myData);
			}
		}

		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

		if (cityString) {
			xhr.send(cityString);
		} else {
			xhr.send();
		}
		
	})
}

module.exports = {
	getData : getData,
	postData: postData,
	putComment: putComment,
	getMarket: getMarket,
	getCities: getCities
}





