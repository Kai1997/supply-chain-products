import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers/rootReducer'
import { middleware } from '../middleware/middleware'
import thunk from 'redux-thunk'
import { GetToken } from '../common/utilities/utilities';

// let userAccount = GetToken() || {
//     accesstoken: '',
//     isAuthenticated: false
// };
let userAccount = {
    accesstoken: '',
    isAuthenticated: false
};
const initState = {
        account: {
            status:{...userAccount},
            register: {
                result: false,
                message: ''
            },
            infoAccount: []
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
const store = createStore(
    rootReducer,
    initState,
    applyMiddleware(
        middleware,
        thunk
    )
    
);

export default store;