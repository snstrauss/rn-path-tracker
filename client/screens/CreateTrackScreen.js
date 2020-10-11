import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { requestPermissionsAsync } from 'expo-location';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Error from '../components/Error';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';

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

    const [error, setError] = useState();

    useEffect(() => {
        requestPermissionsAsync().then(permission => {
            if(!permission.granted){
                setError('Location is needed for this one..');
            } else {

                debugger;

            }

        })

    }, []);


    return (
        <SafeAreaView forceInset={{top: 'always'}} style={S.safe}>
            <Text style={S.title} h3>Create a Path</Text>
            <Map />
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