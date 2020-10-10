import React, { useContext } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { AuthContext } from '../context/AuthProvider';
import { logout } from '../services/login.service';

const S = StyleSheet.create({
    button: {
        color: 'white',
        backgroundColor: 'firebrick',
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 50,
        padding: 17,
    },
    title: {
        fontSize: 50
    }
})

export default function AccountScreen({ navigation: { navigate } }){

    const {methods: authMethods} = useContext(AuthContext);

    function doLogout(){
        logout();
        authMethods.signout();
        navigate('signin');
    }

    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <Text style={S.title}>ACCOUNT</Text>
            <TouchableOpacity onPress={doLogout}>
                <Text style={S.button}>
                    Log Out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}