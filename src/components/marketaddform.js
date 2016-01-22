'use strict';
var React = require('react');


var MarketAddForm = React.createClass({
	render: function() {

		var uploadForm = (
				<div className="row">
					<form method='post' action='upload' enctype="multipart/form-data">
					<input type='file' name='fileUploaded' /><label>Upload photo</label>
					<input type='submit' />
					</form>
				</div>
			)

		return(
			<div className="section addform">
				<h2>Add Market</h2>
				<div className="row">
					<label className="col-xs-2">Name</label>
					<input className="col-xs-6" name="name" type="text" 
					onChange={this.props.onChange} value={this.props.market.name}></input>
				</div>
				<div className="row">
					<label className="col-xs-2">City</label>
					<input className="col-xs-6" name="city" type="text" 
					onChange={this.props.onChange} value={this.props.market.city}></input>
				</div>
				<div className="row">
					<label className="col-xs-2">Address</label>
					<input className="col-xs-6" name="address" type="text" 
					onChange={this.props.onChange} value={this.props.market.address}></input>
				</div>
				<div className="row">
					<label className="col-xs-2" >Day</label>
					<input className="col-xs-6" name="day" type="text" 
					onChange={this.props.onChange} value={this.props.market.day}></input>
				</div>
			</div>
		)
	}
});


module.exports = MarketAddForm;