import { ACCOUNT_LOGIN, ACCOUNT_LOGIN_FAIL, ACCOUNT_REGISTER, ACCOUNT_INFO_USER } from '../../actions/accountActions/actionName.js';
import AccountApi from '../../api/account.js';

/*
* @param: username: string 
* @param: password: string 
*/
export  function loginUser(username, password){
    return (dispatch) => {
        AccountApi.login(username, password).then(res => {
            if (res && res.data && res.data == false) {
                     dispatch({
                        type: ACCOUNT_LOGIN_FAIL
                        // account: res.accesstoken
                    })
                } 
            if (res && res.data && res.data.accessToken ) {
                dispatch({
                    type: ACCOUNT_LOGIN,
                    accesstoken: res.data.accessToken
                })
            }
            }
        );
    }
  
}

/*
* @param: username: string 
* @param: email: string 
* @param: password: string 
*/
export  function registerUser(username, email,  password){
    return (dispatch) => {
        AccountApi.register(username, email, password).then(res => {
            if (res && res.data) {
                     dispatch({
                        type: ACCOUNT_REGISTER,
                        result: res.data.result,
                        message:  res.data.message
                    })
                } 
            }
        );

    }
  
}

/*
* @param: token: string 
*/
export  function infoUser(token){
    return (dispatch) => {
        AccountApi.infoUser(token).then(res => {
            if (res && res.data) {
                     dispatch({
                        type: ACCOUNT_INFO_USER,
                        result: res.data
                    })
                } 
            }
        );

    }
  
}