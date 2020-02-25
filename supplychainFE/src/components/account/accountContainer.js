import { connect } from 'react-redux';
import Account from '../account/account';
import { loginUser, registerUser, infoUser }  from '../../actions/accountActions/actionCreators';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        token: state.account.accesstken,
        isAuth: state.account.isAuthenticated,
        message: state.account.register.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, passwork) => dispatch(loginUser(username, passwork)),
        register: (username, email,  passwork) => dispatch(registerUser(username, email, passwork)),
    }
}

export const AccountContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));