import React from 'react';
import { StyleSheet, Text } from 'react-native';

const S = StyleSheet.create({
    error: {
        borderWidth: 5,
        borderColor: 'firebrick',
        color: 'firebrick',
        fontSize: 20,
        padding: 5,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

export default function Error({ message }){
    return (
        <>
            <Text style={S.error}>
                {message}
            </Text>
        </>
    )
}