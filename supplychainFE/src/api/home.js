import { Api } from './baseApi';
import { url } from './url';


let HomeApi = {
    renderPost() {
        return Api(url + "/post/all", "get")
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            return res;
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return false;
        })
       
    }, 
    increaseViewPost(id,view) {
        return Api(url + "/post/incView?id="+ id+"&view=" + view, "post")
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            return res;
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return false;
        })
       
    },
    getCategory() {
        return Api(url + "/category/all", "get")
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            return res;
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return false;
        })
       
    },
    getInfoProduct(upc) {
        return Api(url + "supply/getInfoProduct?upc=" + upc, "get")
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return false;
        })
       
    }
}
export default HomeApi;