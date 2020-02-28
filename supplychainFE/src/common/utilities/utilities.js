
const Token_remote_Key = 'auth';
import {AsyncStorage} from 'react-native';
export const GetToken = () => {
    if (AsyncStorage && AsyncStorage.getItem(Token_remote_Key)) {
        console.log("aaa");
        console.log(AsyncStorage.getItem(Token_remote_Key));
        return (AsyncStorage.getItem(Token_remote_Key));
    } else {
        console.log("aaadd");
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

export const randomColor = () => {
    const values = [...new Array(3)].map(() => Math.random() * 256).join(',');

    return `rgb(${values})`;
}

export const randomIntro = () => {
    var randomBoolean = Math.random() < 0.5;
    console.log("s",randomBoolean);
    return randomBoolean;
}


export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};
