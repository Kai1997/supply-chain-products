import { HOME_RENDER_POST, HOME_INCREASE_VIEW_POST, HOME_GET_CATEGORY, HOME_GET_INFO_PRODUCT } from '../../actions/homeActions/actionName.js'
const initialState = {
};
/*
*
* @param state: array // substate of store for home page
* @param action: action dispatched from Home component
*
*/
export default function homeReducers(state = initialState, action) {
    switch (action.type) {
        case HOME_RENDER_POST:
            return { ...state, posts: action.post };
        case HOME_GET_CATEGORY:
            return { ...state, category: [action.category] };
        case HOME_INCREASE_VIEW_POST:
            return { ...state};
        case HOME_GET_INFO_PRODUCT:
            return { ...state, infoProduct: action.infoProduct };
        default:
            return state;
    }
}