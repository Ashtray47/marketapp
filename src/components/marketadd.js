'use strict';
var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var MarketdataAPI = require('../api/marketdataAPI');
var MarketAddForm = require('./marketaddform')

var MarketAdd = React.createClass({
	getInitialState: function() {
		return {
			market: {name: '',city: '',day: ''}
		};
	},
	setMarketState: function(evt) {
		var value = evt.target.value;
		var field = evt.target.name;
		this.state.market[field] = value;
		this.setState({market: this.state.market});
	},
	saveMarket: function(event) {
		event.preventDefault();
		MarketdataAPI.addMarket(this.state.market);

		this.setState({market: {name: '',city: '',day: ''} });

	},
	render: function() {
		return(
			<div className="content">
				<MarketAddForm market={this.state.market} onChange={this.setMarketState} />
				<input type="submit" value="Save" className="btn" onClick={this.saveMarket} />
			</div>
		)
	}
});


module.exports = MarketAdd;