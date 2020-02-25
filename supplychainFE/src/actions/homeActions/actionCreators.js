import { HOME_RENDER_POST, HOME_INCREASE_VIEW_POST, HOME_GET_CATEGORY, HOME_GET_INFO_PRODUCT } from '../../actions/homeActions/actionName.js';
import HomeApi from '../../api/home.js';

/*
* @param: number: number //  number to increase
*
*/
export function renderPostAction() {
    return (dispatch) => {
        HomeApi.renderPost().then(res => {
        	console.log(res);
            if (res && res.data && res.data.length > 0) {
                     dispatch({
                        type: HOME_RENDER_POST,
                        post: res.data
                    })
                } 
            }
        );
    }
}

export function increaseViewPostAction(id, view) {
    return (dispatch) => {
        HomeApi.increaseViewPost(id, view).then(res => {
        	console.log(res);
            if (res && res.data && res.data.success == true) {
                     dispatch({
                        type: HOME_INCREASE_VIEW_POST
                    })
                } 
            }
        );
    }
}

export function getCategoryAction() {
    return (dispatch) => {
        HomeApi.getCategory().then(res => {
            if (res && res.data) {
                     dispatch({
                        type: HOME_GET_CATEGORY,
                        category: res.data
                    })
                } 
            }
        );
    }
}

export function getInfoProductAction(upc) {
    return (dispatch) => {
        HomeApi.getInfoProduct(upc).then(res => {
            if (res && res.data && res.data["data"]) {
                     dispatch({
                        type: HOME_GET_INFO_PRODUCT,
                        infoProduct: res.data
                    })
                } 
            }
        );
    }
}