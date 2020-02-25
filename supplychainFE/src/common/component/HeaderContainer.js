import { connect } from 'react-redux';
import Header from './Header';
import { infoUser }  from '../../actions/accountActions/actionCreators';

const mapStateToProps = (state) => {
    return {
        isLoading: state.ui.loading,
        infoLogin: state.account.infoLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        infoUser: (token) => dispatch(infoUser(token)),
    }
}

export const HeaderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));