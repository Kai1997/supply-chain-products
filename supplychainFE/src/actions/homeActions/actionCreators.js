import { HOME_RENDER_POST, HOME_INCREASE_VIEW_POST, HOME_GET_CATEGORY, HOME_GET_INFO_PRODUCT } from '../../actions/homeActions/actionName.js';
import HomeApi from '../../api/home.js';

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