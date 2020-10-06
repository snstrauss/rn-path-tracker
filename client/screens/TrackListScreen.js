import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';

const S = StyleSheet.create({

});

export default function TrackListScreen({ navigation: { navigate } }){
    return (
        <>
            <Text>tracks list</Text>
            <Button title="go to details" onPress={() => navigate('details')}/>
        </>
    )
}