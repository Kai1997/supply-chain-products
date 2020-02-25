import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import '../../styles/login.css'
import PropTypes from 'prop-types';
import { GetToken } from '../../common/utilities/utilities';

export default class Account extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            password : "",
            usernameRegister: "",
            email: "" ,
            passwordRegister: "",
            message: ""
        };

    }
    componentDidMount() {
    }
    login = () => {
        let { username, password } = this.state;
        this.props.login(username, password);
    }
    register = () => {
        let { usernameRegister, email, passwordRegister } = this.state;
        this.props.register(usernameRegister, email, passwordRegister);
        this.setState({
            message: this.props.message
        }, ()=> console.log(this.state)); 
    }
    onHandleChangeInput =(e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    render() {
        const { isAuth, message } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        if (isAuth) {
            return <Redirect to={from} />
        }

        return (
            <Fragment className="login-register" >
                <div className="bg" key ="1"></div>
                <div className="panel" key ="2">
                    <input type="radio" id="switch-open" name="switch" />
                    <input type="radio" id="switch-close" name="switch" />
                    <div className="login">
                        <h1>LOGIN</h1>
                        <div className="group">
                            <i className="fa fa-envelope" aria-hidden="true" />
                            <input type="text" id="username" name= "username" placeholder="E-Mail" onChange ={this.onHandleChangeInput}/>
                            <label htmlFor="username" />
                        </div>
                        <div className="group">
                            <i className="fa fa-unlock-alt" aria-hidden="true" />
                            <input type="password" id="password" name ="password" placeholder="Password" onChange ={this.onHandleChangeInput}/>
                            <label htmlFor="password" />
                        </div>
                        <input type="submit" defaultValue="LOGIN" onClick = {this.login}/>
                    </div>
                    <div className="register">
                        <label className="button-open" htmlFor="switch-open" />
                        <label className="button-close" htmlFor="switch-close" />
                        <div className="inner">
                            <h1>REGISTER</h1>
                            <p>{message}</p>
                            <div className="group">
                                <i className="fa fa-user" aria-hidden="true" />
                                <input type="text" id="name" name ="usernameRegister" placeholder="Name" onChange ={this.onHandleChangeInput}/>
                                <label htmlFor="name" />
                            </div>
                            <div className="group">
                                <i className="fa fa-envelope" aria-hidden="true" />
                                <input type="text" id="email" name ="email" placeholder="E-Mail" onChange ={this.onHandleChangeInput}/>
                                <label htmlFor="email" />
                            </div>
                            <div className="group">
                                <i className="fa fa-unlock-alt" aria-hidden="true" />
                                <input type="password" id="password" name ="passwordRegister" placeholder="Password" onChange ={this.onHandleChangeInput}/>
                                <label htmlFor="password" />
                            </div>
                            <input type="submit" defaultValue="REGISTER" onClick = {this.register}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

Account.propTypes = {
    login: PropTypes.func,
    register: PropTypes.func,
    isAuth: PropTypes.bool, 
    message: PropTypes.string,
}