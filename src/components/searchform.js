'use strict';

var React = require('react');

var Searchform = React.createClass({
	propTypes: {
		value: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired,
		toPage: React.PropTypes.string.isRequired
	},
	render: function() {
		// console.log(this.props.toPage);

		return(
			<div className="search-form">
				<input type="text" value={this.props.value}
				placeholder={this.props.placeholder}
				onChange={this.props.onChange}>
				</input>
				<a href={'#' + this.props.toPage}><button>Find</button></a>
			</div>
		)
	}
})

module.exports = Searchform;