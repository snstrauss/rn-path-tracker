import React from 'react';
import { StyleSheet, View } from 'react-native';

const S = StyleSheet.create({
    spacer: {
        margin: 15
    }
});

export default function Spacer({ children }){
    return (
        <View style={S.spacer}>
            {children}
        </View>
    )
}