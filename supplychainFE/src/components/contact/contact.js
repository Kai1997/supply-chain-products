import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../../styles/contact.css';

export default class Contact extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	     	size_name :false,
	     	size_email: false
	    }
	}
  	onInput =(e) => {
		 this.setState({
	      [e.target.name]: e.target.value.length
	    })
    }
    render() {
        const { isLoading } = this.props;
        let {size_name, size_email} =this.state;
        return (
            <Fragment>
                <div id="contact-form">
		          <p>Dear Kai,</p>
		            <label htmlFor="your-name">My name is</label> 
		            <input type="text" name="size_name" id="your-name" size ={size_name} onChange ={this.onInput} minLength={3} placeholder="(your name here)" required /> 
		          
		            <label htmlFor="email">and my email address is</label> 
		            <input type="email" name="size_email" id="email" size ={size_email} onChange ={this.onInput} placeholder="(your email address)" required /> <br />
		            <label htmlFor="your-message">I have a message for you,</label> 
		            <textarea name="your-message" id="your-message" placeholder="(your msg here)" className="expanding" required defaultValue={""} />
		            <button type="submit">
		              <svg version="1.1" className="send-icn" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="36px" viewBox="0 0 100 36" enableBackground="new 0 0 100 36" xmlSpace="preserve">
		                <path d="M100,0L100,0 M23.8,7.1L100,0L40.9,36l-4.7-7.5L22,34.8l-4-11L0,30.5L16.4,8.7l5.4,15L23,7L23.8,7.1z M16.8,20.4l-1.5-4.3
			l-5.1,6.7L16.8,20.4z M34.4,25.4l-8.1-13.1L25,29.6L34.4,25.4z M35.2,13.2l8.1,13.1L70,9.9L35.2,13.2z" />
		              </svg>
		              <small>send</small>
		            </button>
		        </div>
            </Fragment>
        )
    }
}

Contact.propTypes = {
    isLoading: PropTypes.bool
};