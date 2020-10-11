import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const S = StyleSheet.create({
    container: {
        borderWidth: 5,
        borderColor: 'red',
        flex: 2
    },
    map: {
        borderWidth: 2,
        borderColor: 'green',
        flex: 1
    }
});

export default function Map(){

    const points = Array(20).fill(0).map((_, i) => ({
        latitude: 37.33233 + (i * 0.001),
        longitude: -122.03121 + (i * 0.001)
    }));

    return (
        <View style={S.container}>
            <MapView
                style={S.map}
                initialRegion={{
                    latitude: 37.33233,
                    longitude: -122.03121,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01}}
            >
                <Polyline
                    coordinates={points}
                    strokeWidth={3}
                    strokeColor="#2c78db" />
            </MapView>
        </View>
    )
}