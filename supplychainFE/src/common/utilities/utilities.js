
const Token_remote_Key = 'auth';
import {AsyncStorage} from 'react-native';
export const GetToken = () => {
    if (AsyncStorage && AsyncStorage.getItem(Token_remote_Key)) {
        return (AsyncStorage.getItem(Token_remote_Key));
    } else {
        return false;
    }
    
};

export const SetToken = async (token) => {
    await AsyncStorage.setItem(Token_remote_Key, JSON.stringify({
        accesstoken: token,
        isAuthenticated: true
    }))
}

export const RemoveToken = async () => {
    await AsyncStorage.removeItem(Token_remote_Key)
}

