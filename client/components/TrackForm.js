import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import mockLocationService from '../services/location.service';

const S = StyleSheet.create({
    container: {
        borderWidth: 5,
        borderColor: 'blue',
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: 40
    }
});

export default function TrackForm(){
    return (
        <View style={S.container}>
            <Input label="Track Name" />
            <View style={S.buttons}>
                {
                    ['start', 'stop'].map(type => (
                        <Button key={type} containerStyle={{width: 100}} type="outline" title={type} onPress={mockLocationService[`${type}Mock`]} />
                    ))
                }
            </View>
        </View>
    )
}