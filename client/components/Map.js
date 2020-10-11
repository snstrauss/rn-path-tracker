import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { LocationContext } from '../context/LocationProvider';
import Error from './Error';

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
    },
    spinner: {
        borderWidth: 4,
        borderColor: 'green',
        marginTop: 200
    }
});

export default function Map(){

    const { state: { currentLocation, locations } } = useContext(LocationContext);
    const justPts = locations && locations.map(p => p.coords);

    return (
        <View style={S.container}>
            {
                currentLocation
                ?
                <MapView
                    style={S.map}
                    initialRegion={justPts[0]}
                    region={currentLocation}
                >
                    <Polyline
                        coordinates={justPts}
                        strokeWidth={3}
                        strokeColor="#2c78db" />
                </MapView>
                :
                <Error message="WAITTT" />

            }
        </View>
    )
}