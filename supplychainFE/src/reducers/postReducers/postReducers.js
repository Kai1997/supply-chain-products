import { POST_GET_ID, POST_GET_ID_NULL } from '../../actions/postActions/actionName.js'

/*
*
* @param state: array // substate of store for home page
* @param action: action dispatched from Home component
*
*/
export default function postReducers(state = {}, action) {
    switch (action.type) { 
        case POST_GET_ID:
            return { ...state, data: [action.data]  };
        case POST_GET_ID_NULL:
            return { ...state, data: null };
        default:
            return state;
    }
}