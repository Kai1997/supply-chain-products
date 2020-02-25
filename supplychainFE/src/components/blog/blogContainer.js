import { connect } from 'react-redux';
import Blog from '../blog/blog';

const mapStateToProps = (state) => {
    return {
        isLoading: state.ui.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export const BlogContainer = connect(mapStateToProps, mapDispatchToProps)(Blog);