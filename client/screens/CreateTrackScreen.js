import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationEvents, SafeAreaView } from 'react-navigation';
import Error from '../components/Error';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';
import { LocationContext } from '../context/LocationProvider';
import useLocation from '../hooks/useLocation';

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

export default function CreateTrackScreen(){

    const { state: locationState, methods: locationMethods } = useContext(LocationContext);
    const [locationError] = useLocation(locationMethods.add, locationState.recording);

    return (
        <SafeAreaView forceInset={{top: 'always'}} style={S.safe}>
            <Text style={S.title} h3>Create a Path</Text>
            <Map points={locationState.locations} />
            <TrackForm />
            {
                locationError &&
                <View style={S.error}>
                    <TouchableOpacity onLongPress={() => setError()}>
                        <Error message={locationError} />
                    </TouchableOpacity>
                </View>
            }

            <NavigationEvents
                onDidFocus={locationMethods.start}
                onWillBlur={locationMethods.stop}/>
        </SafeAreaView>
    )
}