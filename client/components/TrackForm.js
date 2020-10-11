import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const S = StyleSheet.create({
    container: {
        borderWidth: 5,
        borderColor: 'blue',
        flex: 1
    }
});

export default function TrackForm(){
    return (
        <View style={S.container}>
            <Text>
                Track Form
            </Text>
        </View>
    )
}