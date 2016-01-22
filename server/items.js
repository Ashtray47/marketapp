//items.js
var data = require('./data.js');

var Items = function(app) {

	app.route('/api/items')
		.get(function(req, res) {
			res.send(data);
		})
		.post(function(req, res) {
			//console.log(req.body);

			var item = req.body;

			if (Object.keys(item).length > 0) {
				data.push(item);
			}

			res.send(data);

		})
		.put(function(req, res) {
			var payload = req.body;

		//	console.log(payload);

			for (var i = 0; i < data.length; i++) {
				if (data[i].id == payload.id) {
					data[i].comments.push(payload.comment);
				}
			}

			res.send(data);

		})

	app.route('/api/markets')
		.get(function(req, res) {
			res.send(data);
		})

	app.route('/api/:city')
		.get(function(req,res) {
			var sCity = req.params.city.slice(1);
			var selectedMarkets = [];

		for (var i = 0; i < data.length; i++) {
			if (data[i].city === sCity) {
				selectedMarkets.push(data[i]);
			}
		}

			res.send(selectedMarkets);

		//	res.redirect('/');
		})

	app.route('/api/id/:id')
		.get(function(req, res) {
			var id = req.params.id.slice(1);
			var selectedId;

			for (var i = 0; i < data.length; i++) {
				if (data[i].id == id) {
					var selectedId = data[i];
				}
			}

			res.send(selectedId);

		})

	app.route('/api/getcities')
		.post(function(req, res) {
			var citystring = req.body;
			// console.log(citystring);

			res.send(citystring);
		})
}


module.exports = Items;




