import AsyncStorage from "@react-native-community/async-storage";
import trackApi from "../api/trackApi";

const USER_TOKEN = 'user-token';

function callTrackApi(route, credentials){
    return trackApi.post(route, credentials, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(({ data: { token } }) => AsyncStorage.setItem(USER_TOKEN, token).then(() => {
        return token;
    }));
}


export const signup = callTrackApi.bind(null, 'signup');
export const signin = callTrackApi.bind(null, 'signin');

export default {
    signup,
    signin
}