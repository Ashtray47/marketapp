'use strict'

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


var SearchCityList = React.createClass({
	setInitialState: function() {
		return {
			currentPage: "searchlist"
		};
	},
	citylist: function() {
		var self = this;
		var numMarket = "market";

		if (this.props.foundMarkets) {
			return this.props.foundMarkets.map(function(ele,i) {

				if (ele.count > 1) {
					numMarket = "markets";
				} else {
					numMarket = "market";
				}

				return (
					<li className="citylist row" key={ele.id}>
					<a href={"#/list/:" + ele.city}>
						<h4 className="col-xs-6 city" key={ele.id + "city"}>{ele.city}</h4>
						<p className="col-xs-6 count" key={ele.id + "count"}>Found {ele.count} {numMarket} in this city</p>
					</a>
					</li>
				)
			})
		} else {
			return <li className="list">
				<p>Search cities in the Bay Area</p>
				<p>ie. San Francisco, Mountain View, etc</p>

			</li>
		}
	},
	render: function() {

		return (
			<div>
				<ul>
				<ReactCSSTransitionGroup  transitionName="citylistTransition" 
					transitionAppear={true} transitionAppearTimeout={300} 
					transitionEnterTimeout={300} transitionLeaveTimeout={300}>
						{this.citylist()}
				</ReactCSSTransitionGroup>
				</ul>
			</div>
		);
	}

});

module.exports = SearchCityList;