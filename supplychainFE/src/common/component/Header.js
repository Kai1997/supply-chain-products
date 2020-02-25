import React from 'react';
import { RemoveToken } from '../utilities/utilities';
import '../../styles/header.css'
import { BrowserRouter as Route, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GetToken } from '../utilities/utilities';


class Header extends React.Component {

	componentDidMount() {
		if (GetToken() !== false) {
            this.props.infoUser(GetToken().accesstoken);
        }
	}
	logOut = () => {
		RemoveToken();
		return <Redirect to="/" />
	}

	pushMenu(e) {
	    e.preventDefault();
	    var body = document.body;
	    if (window.innerWidth > 768) {
	        if (body.className.indexOf('sidebar-collapse') === -1) {
	            body.className += ' sidebar-collapse';
	        } else {
	            body.className = body.className.replace(' sidebar-collapse', '');
	        }
	    } else {
	        if (body.className.indexOf('sidebar-open') === -1) {
	            body.className += ' sidebar-open';
	        } else {
	            body.className = body.className.replace(' sidebar-open', '');
	        }
	    }
	}

	render() {
		let { infoLogin } = this.props;
		let renderAfterLogin;
		if (infoLogin && infoLogin.result && infoLogin.result.success == true) {
			renderAfterLogin = <li onClick ={this.logOut}>{infoLogin.result.tel},logout</li>
		} else {
			renderAfterLogin = <li> <Link to="/login">Login</Link></li>
		}
		return (
			<header>
				<nav>
					<h1><Link to="/">KBlog</Link></h1>
					<ul className ="navbar-header">
						<li>
							<Link to="/category">Category</Link>
						</li>
						<li>
							<Link to="/contact">Contact</Link>
						</li>
						{renderAfterLogin}
					</ul>
				</nav>

			</header>
		);
	}
}
export default Header;

Header.propTypes = {
    infoUser: PropTypes.func
}