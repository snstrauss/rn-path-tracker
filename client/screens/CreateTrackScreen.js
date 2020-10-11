import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Error from '../components/Error';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';
import { LocationContext } from '../context/LocationProvider';
import { mockLocationChange } from '../services/location.service';

const S = StyleSheet.create({
    safe: {
        flex: 1
    },
    title: {
        padding: 5
    },
    error: {
        backgroundColor: 'pink',
        position: 'absolute',
        alignSelf: 'center',
        top: '50%'
    }
});

let stopInterval;
export default function CreateTrackScreen(){

    const [error, setError] = useState();

    const { state: locationState, methods: locationMethods } = useContext(LocationContext);

    if(locationState.locations.length > 9){
        stopInterval();
    }

    useEffect(() => {
        async function startWatch(){
            try {
                await requestPermissionsAsync();
                await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                }, (location) => {
                    if(location.mocked !== false){
                        locationMethods.add(location);
                    }
                });

                stopInterval = mockLocationChange();
            } catch (error) {
                setError('Location is needed obviously');
            }

        }

        startWatch();
    }, []);


    return (
        <SafeAreaView forceInset={{top: 'always'}} style={S.safe}>
            <Text style={S.title} h3>Create a Path</Text>
            <Map points={locationState.locations} />
            <TrackForm />
            {
                error &&
                <View style={S.error}>
                    <TouchableOpacity onLongPress={() => setError()}>
                        <Error message={error} />
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    )
}