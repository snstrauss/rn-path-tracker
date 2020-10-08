import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { AuthContext } from '../context/AuthProvider';
import { signin, signup } from '../services/login.service';

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
        padding: 5
    },
    signinLink: {
        color: 'dodgerblue'
    }
});

export default function SigninScreen({ navigation: { navigate } }){

    const { state: auth, methods: authMethods } = useContext(AuthContext);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    function goToSignup(){
        navigate('signup');
    }

    function signIn(){
        signin({
            username,
            password
        }).then((token) => {
            authMethods.signin(token);
            navigate('mainFlow');
        }).catch(err => {
            authMethods.showError(err.response.data);
        });
    }

    return (
        <View style={S.container}>
            <Spacer>
                <Text h3>Sign In</Text>
            </Spacer>
            <Input label="Username" value={username} onChangeText={setUsername} autoCapitalize="none" autoCorrect={false} />
            <Spacer />
            <Input label="password" value={password} onChangeText={setPassword} autoCapitalize="none" autoCorrect={false} secureTextEntry />
            <Spacer />
            <Spacer>
                <Button title="Sign In" onPress={signIn} type="outline" raised />
            </Spacer>
            <Spacer>
                <TouchableOpacity onPress={goToSignup}>
                    <Text style={S.signinLink}>
                        Don't have an account?
                        Go To Sign-Up!
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
    )
}

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}