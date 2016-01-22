'use strict';

var React = require('react');

var Header = React.createClass({
	onClickLink: function(e) {
		e.preventDefault;
		window.history.go(-1);

	},
	render: function() {
		var self = this;
		var link = function() {
			if (self.props.backLink) {
				return (
					<p className="back-link-btn"><a href={'#' + self.props.backLink} onClick={self.onClickLink}>Back</a></p>
				)
			}
		}()

		return (
			<div className="header">
				<h3 className="title">Farmers&apos; Markets Finder</h3>
				{link}
			</div>
		);
	}

});

module.exports = Header;