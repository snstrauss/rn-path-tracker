import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';

const S = StyleSheet.create({

});

export default function SignupScreen({ navigation: { navigate } }){

    function goToSignin(){
        navigate('signin');
    }

    return (
        <>
            <Text>sign up</Text>
            <Button title="to sign in" onPress={goToSignin} type="outline" raised />
        </>
    )
}