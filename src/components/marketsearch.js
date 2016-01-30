'use strict';

var React = require('react');
var SearchForm = require('./searchform');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Header = require('./header');
var SearchCityList = require('./searchcitylist');
var MarketdataAPI = require('../api/marketdataAPI');
var AppContainer = require('./app');
var ReactDOM = require('react-dom');

var MarketSearch = React.createClass({
	getDefaultProps: function() {

	},
	getInitialState: function() {
		return {
			value: "",
			linkvalue: "",
			backLink: "/",
			cityList: null
		}
	},
	componentDidUpdate: function() {
	},
	enterCity: function() {
		//evt.preventDefault();
		this.setState({linkvalue: "/list/:" + this.state.value});
	},
	handleChange: function(evt) {
		var inputValue = evt.target.value;
		this.setState({value: inputValue});

		this.setState({linkvalue: "/list/:" + inputValue});

		if (inputValue) {
			MarketdataAPI.searchCityList(inputValue).then(function(d) {
				this.setState({cityList: d})
				
			}.bind(this));
		}

	},
	render: function() {
		return (
			<div>
				<Header />
				<ReactCSSTransitionGroup transitionName="page" 
				 transitionAppear={true} transitionAppearTimeout={100} 
				 transitionEnterTimeout={100} transitionLeaveTimeout={100}>
				<div className="content">

					<figure className="header-image"></figure>

					<div className="section-padding center">
						<SearchForm value={this.state.value}
							onChange={this.handleChange}
							toPage ={this.state.linkvalue} />
					</div>

					<div className="section-padding">
						<SearchCityList foundMarkets={this.state.cityList} />
					</div>

					<div className="footer-add">
						<h5>Know a market this is not on the list?</h5>
						<p><a href="#/add"><button type='button'>Add it here</button></a></p>
					</div>
				</div>
				</ReactCSSTransitionGroup>
			</div>
		);
	}

});



module.exports = MarketSearch;