import axios from 'axios';

export const Api = (url, method, dataBody = null, token = null, params = null) => {
    let header =  {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': token
    }
    let axiosConfig =  {
        method: method,
        url: url, 
        headers: header,
        data: dataBody,
        params
    }
    if (!token) {
        delete header.authorization;
    }
    if (!dataBody) {
        delete axiosConfig.data;
    }
    if (!params) {
        delete axiosConfig.params;
    }
    return axios(axiosConfig)
      
}