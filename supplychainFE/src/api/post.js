import { Api } from './baseApi';
import { url } from './url';


let PostApi = {
    getPostId(id) {
        let newId = id.split('-').reverse()[0];
        return Api(url + "/post/getItem?id="+ newId,"get")
        .then((res) => { 
            console.log("RESPONSE RECEIVED: ", res);
            return res;
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return false;
        })
       
    }
}
export default PostApi;