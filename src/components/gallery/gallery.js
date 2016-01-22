'use strict';

var React = require('react');
var SwapGallery = require('./gallerylogic');

var Gallery = React.createClass({
	getInitialState: function() {
		return {
			active: 0,
			galleryitem: {
				width: 225,
				height: 150
			}
		}
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			var swapGallery01 = new SwapGallery('#swap-gallery-1');
		}
	},

	render: function() {
	var self = this;

	var galleryList = this.props.galleryItems.images.map(function(ele,i) {

	var liClassName = "";

		if (i === self.state.active) {
			liClassName = "active"
		}

		return (
			<li className={liClassName} key={i}>
				<figure className="gallerylist" 
					style={{backgroundImage: "url(" + self.props.imgLocation + ele + ".jpg)"}}>
				</figure>
			</li>
		)
	})

		return (
			<div id="swap-gallery-1" className="swap-gallery center">
				<ul>
					{galleryList}
				</ul>
				<div className="action-buttons">
					<button id="prevBtn" className="btn">Prev</button>
					<button id="nextBtn" className="btn">Next</button>
				</div>
			</div>
		)
	}
})

module.exports = Gallery;