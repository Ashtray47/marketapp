'use strict';

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var MarketdataAPI = require('../api/marketdataAPI');
var MarketStore = require('../stores/MarketStore');
var MarketAdd = require('./marketadd');
var Header = require('./header');

var DataHelper = require('../api/datahelper');
var dataLoaded = DataHelper.getData


var MarketList = React.createClass({

	getInitialState: function() {
		return {
			markets: [],
			selectedCity: "",
			market: { name: '', city: '', address: '', day: ''},
			value: "",
			imageinfo: {
				backgroundImage: "url(../images/noimage.png)"
			}
		};
	},
	componentWillMount: function() {
		MarketStore.addChangeListener(this._onChange);
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			this.setMarketList();
		};
	},
	_onChange: function() {
		this.setMarketList();
	},
	setMarketList: function() {
		var cityUrlAll = window.location.hash;
		var cityUrlTrim = cityUrlAll.split(":")[1];

		var list = MarketdataAPI.searchMarketCity(cityUrlTrim);
		
		var self = this;

		list.then(function(d) {
			self.setState({markets: d, selectedCity: cityUrlTrim});
		})
	},
	render: function() {

		var self = this;

		var selectedList;
		var selectedCityHeading;
		var selectedImage;

		var listofMarket = function(markets) {
			if (self.state.markets) {
				if (self.state.markets.length === 0) {
					selectedCityHeading = "No Markets";
					selectedList = <li className="citylist"> <p>There are no Markets in this city</p> </li>;
				}
				else if (self.state.markets.length > 0) {
					selectedCityHeading = <span>Markets in {self.state.selectedCity}</span>;
					selectedList = self.state.markets.map(function(ele) {

						if (ele.images[0]) {
							selectedImage = { backgroundImage: "url(../images/"+ele.id+"/"+ele.images[0]+".jpg)"};
						} else {
							selectedImage = { backgroundImage: "url(../images/noimage.png)" };;
						}

						return (
							<li className="citylist" key={ele.id}>
								<a className="row" href={"#/info/:" + ele.id}>
									<div className="infodiv col-xs-7">
										<h4>{ele.name}</h4>
										<p>{ele.address}</p>
			
										<p>{ele.day}</p>
									</div>
									<figure className="listimage col-xs-4" style={selectedImage}> </figure>
								</a>
							</li>
						)
					})
				}
			}
		}();

		return (
			<div>
				<Header backLink="/" />
				<ReactCSSTransitionGroup transitionName="page" 
				transitionAppear={true} transitionAppearTimeout={500} 
				transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					<div className="content">
						<h3 className="selected-city-heading">{selectedCityHeading}</h3>
						<ul>
							{selectedList}
						</ul>
					</div>

				</ReactCSSTransitionGroup>
			</div>
		);
	}

});


module.exports = MarketList;


