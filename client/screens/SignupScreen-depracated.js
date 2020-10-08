import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { AuthContext } from '../context/AuthProvider';
import { signup } from '../services/login.service';

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

export default function SignupScreen({ navigation: { navigate } }){

    const { state: auth, methods: authMethods } = useContext(AuthContext);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    function goToSignin(){
        navigate('signin');
    }

    function signUp(){
        signup({
            username,
            password
        }).then((token) => {
            authMethods.signup(token);
            navigate('mainFlow');
        }).catch(err => {
            authMethods.showError(err.response.data);
        });
    }

    return (
        <View style={S.container}>
            <Spacer>
                <Text h3>Sign Up</Text>
            </Spacer>
            <Input label="Username" value={username} onChangeText={setUsername} autoCapitalize="none" autoCorrect={false} />
            <Spacer />
            <Input label="password" value={password} onChangeText={setPassword} autoCapitalize="none" autoCorrect={false} secureTextEntry />
            <Spacer />
            <Spacer>
                <Button title="Sign Up" onPress={signUp} type="outline" raised />
            </Spacer>
            <Spacer>
                <TouchableOpacity onPress={goToSignin}>
                    <Text style={S.signinLink}>
                        Already have an account?
                        Go To Sign-In!
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

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}