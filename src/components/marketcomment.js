'use strict'

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var ReactTransitionGroup = require('react-addons-transition-group');
var MarketdataAPI = require('../api/marketdataAPI');
var CommentStore = require('../stores/commentStore');
var Header = require('./header');

var LoadComments = React.createClass({
	render: function() {
		return (
			<ReactCSSTransitionGroup transitionName="commentload"
			transitionAppear={true} transitionAppearTimeout={500}
			transitionEnterTimeout={500} transitionLeaveTimeout={500}>
				<h4>Load reviews and comments</h4>
			</ReactCSSTransitionGroup>
		)
	}
})

var CommentSection = React.createClass({
	render: function() {
	return (
		<ReactCSSTransitionGroup transitionName="comment"
		transitionAppear={true} transitionAppearTimeout={500}
		transitionEnterTimeout={500} transitionLeaveTimeout={500}>
			<div>
				<h4>User reviews and comments</h4>
				<CommentInput selectedMarket={this.props.market} />
				<CommentList commentData={this.props.market.comments} />
			</div>
		</ReactCSSTransitionGroup>
		)
	}
})

var CommentInput = React.createClass({
	getInitialState: function() {
		return {
			value: ""
		}
	},
	saveComment: function() {
		MarketdataAPI.addCommentID(this.props.selectedMarket.id, this.state.value);
		this.setState({value: ""});

	},
	onChange: function(evt) {
		this.setState({value: evt.target.value});
	},
	render: function() {

		return (
			<div>
				<input className="comment-input" type="text" value={this.state.value}
				onChange={this.onChange}
				placeholder="Enter Comments">
				</input>

				<button id="commentSubmitBtn" type="submit" value="Post Message" className="btn" onClick={this.saveComment}>
				 Post Message
				</button>
			</div>
		)
	}
})

var CommentList = React.createClass({
	getInitialState: function() {
		return {
			animStyle: {
				opacity: 1,
				transition: "2000ms"
			}
		}
	},
	componentWillEnter: function() {
		/*
		this.setState({animStyle: {
			opacity: 1,
			transition: "2000ms"} 
		});
		*/
	},
	render: function() {
		var reverseComment = [];
		// show latest comments on the top
		if (this.props.commentData) {
			for (var i = this.props.commentData.length; i >= 0; i--)
				reverseComment.push(this.props.commentData[i]);

				//reverseComment = this.props.commentData.reverse();
		}

		var commentLine;
		var self = this;

		if (reverseComment.length > 0) {
			commentLine = reverseComment.map(function(ele,i) {
				if (i === 0) {
					return (
						<div component="li" className="comment-list animated-list" key={i} >
							<p>{ele}</p>
						</div> 
					)
				}
				else {
					return (
						<li className="comment-list" key={i}>
							<p>{ele}</p>
						</li> 
					)
				}
			})
		} else {
			commentLine = <li className="comment-list">Add a comment</li>
		}

		return (
			<ul className="comment-ul">
				<ReactCSSTransitionGroup transitionName="newcomment" 
				transitionAppear={false} 
				transitionEnter={true}
				transitionAppearTimeout={500} 
				transitionEnterTimeout={500} 
				transitionLeaveTimeout={500}>
					{commentLine}
				</ReactCSSTransitionGroup>
			</ul>
		)
	}
})

var MarketComment = React.createClass({
	getInitialState: function() {
		return {
			showcomment: false
		}
	},
	showComments: function(e) {
	//	console.log('show comments')
		this.setState({showcomment: true});

	},
	render: function() {
		var commentArea;

		if (this.state.showcomment === true) {
			commentArea = (
				<CommentSection market={this.props.selectedMarket} />
			)
		} else {
			commentArea = (
				<div onClick={this.showComments} className="btn-n">
					<LoadComments />
				</div>
			)
		}

		return (
			<div className="comment-section">
				{commentArea}
			</div>
		)
	}
})

module.exports = MarketComment






