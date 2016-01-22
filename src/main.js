"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var MarketSearch = require('./components/marketsearch');
var MarketList = require('./components/marketlist');
var MarketAddPage = require('./components/marketaddpage');
var MarketInfoPage = require('./components/marketinfopage');
var PageNotFound = require('./components/pagenotfound');
var Header = require('./components/header');

var appContainer = document.getElementById('app');

var MainPage = React.createClass({
	getInitialState: function() {
		return {
			windowHash: ""
		}
	},
	componentDidMount: function() {
		window.addEventListener("hashchange", this._onHashChange, false);
	},
	_onHashChange: function() {
		var windowURL = window.location.hash;

		var noHashURL = windowURL.split("#")[1]

		this.setState({windowHash: noHashURL});

	},
	render: function() {
		var url = this.state.windowHash;

		if(url) {
			if (url.indexOf('list') > -1) {
				return (<MarketList />)

			} else if (url.indexOf('info') > -1) {
				return (<MarketInfoPage />)

			} else if (url === "/add") {
				return (<MarketAddPage />)

			} else if (url === "/") {
				return (<MarketSearch />)
			}
			else if (url === "") {
				return (<MarketSearch />)
			}
		} else {
			return (<MarketSearch />)
		}


	}
})


ReactDOM.render(( <MainPage /> ), appContainer);




