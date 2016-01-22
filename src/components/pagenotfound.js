'use strict';

var React = require('react');
var Header = require('./header');

var PageNotFound = React.createClass({
	render: function() {
		return (
			<div>
				<Header backLink="/" />
				<div className="content">
					<h3>Page Not Found</h3>
				</div>
			</div>
		);
	}

});

module.exports = PageNotFound;

