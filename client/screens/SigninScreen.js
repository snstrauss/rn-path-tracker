import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';

const S = StyleSheet.create({

});

export default function SigninScreen({ navigation: { navigate } }){

    function goToSignup(){
        navigate('signup');
    }

    return (
        <>
            <Text>sign in</Text>
            <Button title="go to sign up" onPress={goToSignup} />
            <Button title="go to main flow" onPress={() => navigate('mainFlow')}/>
        </>
    )
}