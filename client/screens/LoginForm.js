import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { AuthContext } from '../context/AuthProvider';
import loginService from '../services/login.service';

const S = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 50
    },
    error: {
        borderWidth: 5,
        borderColor: 'firebrick',
        color: 'firebrick',
        fontSize: 20,
        padding: 5,
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    otherScreenLink: {
        color: 'dodgerblue'
    }
});

const screenParams = {
    signin: {
        title: 'Sign In',
        otherPage: 'signup',
        otherText: "Don't",
        otherTitle: 'Sign Up'
    },
    signup: {
        title: 'Sign Up',
        otherPage: 'signin',
        otherText: "Already",
        otherTitle: 'Sign In'
    }
}

export default function LoginForm(type){

    function LoginScreen({ navigation: { navigate } }){

        const { state: auth, methods: authMethods } = useContext(AuthContext);

        const [username, setUsername] = useState();
        const [password, setPassword] = useState();

        const [finishedCheckExisting, setFinishedCheck] = useState(false);

        useEffect(() => {
            if(type === 'signin'){
                loginService.checkExistingToken()
                .then(loginWithTokenAndNavigate)
                .catch(() => {
                    setTimeout(() => {
                        setFinishedCheck(true);
                    }, 2000)
                })
            }
        }, [])

        function goToOtherScreen(){
            navigate(screenParams[type].otherPage)
        }

        function login(){
            loginService[type]({
                username,
                password
            })
            .then(loginWithTokenAndNavigate)
            .catch(err => {
                authMethods.showError(err.response.data);
            });
        }

        function loginWithTokenAndNavigate(token){
            authMethods[type](token);
            navigate('mainFlow');
        }

        return (
            <>
                {
                    finishedCheckExisting
                    ?
                    <View style={S.container}>
                        <Spacer>
                            <Text h3>{screenParams[type].title}</Text>
                        </Spacer>
                        <Input label="Username" value={username} onChangeText={setUsername} autoCapitalize="none" autoCorrect={false} />
                        <Spacer />
                        <Input label="password" value={password} onChangeText={setPassword} autoCapitalize="none" autoCorrect={false} secureTextEntry />
                        <Spacer />
                        <Spacer>
                            <Button title={screenParams[type].title} onPress={login} type="outline" raised />
                        </Spacer>
                        <Spacer>
                            <TouchableOpacity onPress={goToOtherScreen}>
                                <Text style={S.otherScreenLink}>
                                    {`${screenParams[type].otherText} have an account?\nGo To ${screenParams[type].otherTitle}`}
                                </Text>
                            </TouchableOpacity>
                        </Spacer>
                        {
                            auth.errorMessage &&
                            <TouchableOpacity onLongPress={() => authMethods.showError()}>
                                <Text style={S.error}>{auth.errorMessage}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    :
                    <Text style={S.error}>
                        WAITT
                    </Text>
                }
            </>
        )
    }

    LoginScreen.navigationOptions = () => {
        return {
            headerShown: false
        }
    };

    return LoginScreen;
}