'use strict'

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var MarketdataAPI = require('../api/marketdataAPI');
var MarketStore = require('../stores/MarketStore');
var CommentStore = require('../stores/CommentStore');
var Header = require('./header');
var MarketComment = require('./marketcomment');
var Gallery = require('./gallery/gallery')

var MarketInfoPage = React.createClass({
	getInitialState: function() {
		return {
			market: '',
			bgImage: {
				backgroundImage: 'url(./images/noimage.png)'
			},
			link: '/'
		}
	},
	componentWillMount: function() {
		CommentStore.addChangeListener(this._onChange);
		this._getMarketInfo();
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			this._getMarketInfo();
		}
	},
	_onChange: function() {
		this._getMarketInfo();

	},
	_getMarketURL: function() {
		var marketId = window.location.hash;
		return marketId.split(":")[1].split("?")[0];
	},
	_getMarketInfo: function() {
		var marketIdTrim = this._getMarketURL();
		var marketdata = MarketdataAPI.selectedMarketID(marketIdTrim);
		var self = this;

		marketdata.then(function(d) {
			self.setState({market: d});

			if (d.images[0]) {
				self.setState({
					bgImage: {
						backgroundImage: "url(./images/" + d.id + "/" + d.images[0] + ".jpg)"
					}
				});
			}
		})
	},
	render: function() {
		var self = this;

		var image;

		if (this.state.market.images) {
			if (this.state.market.images.length <= 1) {
				image = <figure className="infoimage" style={this.state.bgImage}></figure>
			} else if (this.state.market.images.length > 1) {
				image = <Gallery galleryItems={this.state.market} 
					imgLocation={"./images/" + this.state.market.id + "/"} />
			}
		}

		return (
			<div>
				<Header backLink={this.state.link} />
				<ReactCSSTransitionGroup transitionName="page"
				 transitionAppear={true} transitionAppearTimeout={500}
				 transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					<div className="content">
						<div className="market-info">
							<h3> {this.state.market.name} </h3>
							<p> Location: {this.state.market.address}, {this.state.market.city} </p>
							<p> Days open: {this.state.market.day} </p>
							{image}
						</div>
						<MarketComment selectedMarket={this.state.market} />
					</div>
				</ReactCSSTransitionGroup>
			</div>
		);
	}

})


module.exports = MarketInfoPage
