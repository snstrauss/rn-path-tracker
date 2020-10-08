import createDataContext from './createDataContext';

const keepToken = (state, token) => ({
    signedIn: true,
    token
});

const authActions = {
    signup: keepToken,
    signin: keepToken,
    signout: (state) => ({
        signedIn: false,
        token: null
    }),
    showError: (state, error) => ({
        ...state,
        errorMessage: error
    })
};

const { Provider, Context } = createDataContext('auth', authActions, {
    isSignedIn: false,
    token: undefined,
    errorMessage: undefined
});

const AuthProvider = Provider;

export const AuthContext = Context;
export default AuthProvider;