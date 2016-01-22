'use strict';
var React = require('react');
var MarketAdd = require('./marketadd.js');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Header = require('./header');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


var MarketAddPage = React.createClass({
	getInitialState: function() {
		return {
			link: "/"
		}

	},
	render: function() {
		return (
			<div>
				<Header backLink={this.state.link} />
				<ReactCSSTransitionGroup transitionName="page" 
				transitionAppear={true} transitionAppearTimeout={300} 
				transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					<div className="content">
						<MarketAdd />
					</div>
				</ReactCSSTransitionGroup>
			</div>
		)
	}
});


module.exports = MarketAddPage;