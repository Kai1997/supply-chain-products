import { connect } from 'react-redux';
import Contact from '../contact/contact';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        isLoading: state.ui.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export const ContactContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Contact));