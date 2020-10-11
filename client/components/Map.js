import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
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

function circleColor(alpha){
    return `rgba(158, 158, 255, ${alpha})`;
}

export default function Map(){

    const { state: { currentLocation, locations } } = useContext(LocationContext);
    const justPts = locations && locations.map(p => p.coords);

    const region = {
        ...currentLocation,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    };

    return (
        <View style={S.container}>
            {
                currentLocation
                ?
                <MapView
                    style={S.map}
                    // initialRegion={region}
                    region={region}
                >
                    <Polyline
                        coordinates={justPts}
                        strokeWidth={3}
                        strokeColor="#2c78db" />
                    <Circle
                        center={currentLocation}
                        strokeColor={circleColor(1)}
                        fillColor={circleColor(0.3)}
                        radius={3}/>
                </MapView>
                :
                <Error message="WAITTT" />

            }
        </View>
    )
}