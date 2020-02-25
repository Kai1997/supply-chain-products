import { connect } from 'react-redux';
import Post from '../post/post';
import getPostIdAction from '../../actions/postActions/actionCreators';

const mapStateToProps = (state) => {
    return {
        post: state.post.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    	getPostId: (id) => dispatch(getPostIdAction(id))
    }
}

export const PostContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));