import { Api } from './baseApi';
import { url } from './url';

let AccountApi = {
    login(username, password) {
        let body =  {
                username: username,
                password: password
            };
        /**
         * call success save token to localStorare for persitance data when refresh page
         */
        return Api(url + "/auth/login", "post", body)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            return res;
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return false;
        })
        // SetToken('_fakeToken_');
        // return { username, password };
    },
    register(username, email, password, ) {
        let body =  {
                username: username,
                email: email,
                password: password,
                coin : 0,
                tel: "",
                address: "",
                background: ""
            };
        /**
         * call success save token to localStorare for persitance data when refresh page
         */
        return Api(url + "/auth/register", "post", body)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            return res;
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return false;
        })
        // SetToken('_fakeToken_');
        // return { username, password };
    },
    infoUser(token) {
        return Api(url + "/auth//token/verify", "get", null, token)
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
export default AccountApi;