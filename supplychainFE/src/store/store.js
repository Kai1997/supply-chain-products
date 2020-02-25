import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers/rootReducer'
import { middleware } from '../middleware/middleware'
import thunk from 'redux-thunk'
import { GetToken } from '../common/utilities/utilities';

let userAccount = GetToken() || {
    accesstoken: '',
    isAuthenticated: false
};

const initState = {
        account: {...userAccount,
            register: {
                result: false,
                message: ''
            },
            infoLogin: []
        },
        home: {
            posts: [],
            category: [],
            infoProduct: []
        },
        ui: {
            loading: false
        }
    }
// const initState ={};
const store = createStore(
    rootReducer,
    initState,
    applyMiddleware(
        middleware,
        thunk
    )
    
);

export default store;