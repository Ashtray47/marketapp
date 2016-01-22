var mongoose = require('mongoose');

var MarketItemSchema = {
	id:String,
	name:String,
	city:String,
	day:String,
	likes:Number,
	comments:[String]
};

var MarketItem = mongoose.model('MarketItem', MarketItemSchema, "marketItems");

module.exports = MarketItem;