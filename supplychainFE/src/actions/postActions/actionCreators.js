import { POST_GET_ID, POST_GET_ID_NULL } from '../../actions/postActions/actionName.js';
import PostApi from '../../api/post.js';

/*
* @param: number: number //  number to increase
*
*/
export default function getPostIdAction(id) {
    return (dispatch) => {
        PostApi.getPostId(id).then(res => {
            if (res && res.data) {
                dispatch({
                    type: POST_GET_ID,
                    data: res.data
                })
            } else {
                dispatch({
                    type: POST_GET_ID_NULL
                  
                })
            } 
        });
    }
}