import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../../styles/post.css';
import { Redirect } from 'react-router-dom';

export default class Post extends Component {

	componentDidMount(){
		// window.location.reload();
		let id = this.props.match.params.id;
		let postId = this.props.getPostId(id);
	}
	render() {
		const { isLoading, post } = this.props;
		let renderPost;
		if (post && post.length > 0) {
			renderPost = post.map((value, key) => {
				return (
				<div className ="content-post" key ={key}>
					<div className="hero">
						<h1><span>I'm a cool</span><br />{value.title}</h1>
						{/* <div className="mouse">
							<span />
						</div> */}
					</div>
					<div className="row content content-row">
						{value.content}
					</div>
				</div>
				);
			});
		}
		return (
			<Fragment>
				{renderPost}
			</Fragment>
		)
	}
}

Post.propTypes = {
	getPostId: PropTypes.func,
	isLoading: PropTypes.bool,
	post: PropTypes.array
};