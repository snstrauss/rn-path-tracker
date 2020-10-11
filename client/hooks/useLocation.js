import { Accuracy, requestPermissionsAsync, watchPositionAsync } from "expo-location";
import { useEffect, useState } from "react";

let listenSubscriber;
export default function useLocation(onGetLocation, isRecording){

    const [locationErr, setError] = useState();

    async function startWatch(){
        try {
            await requestPermissionsAsync();
            console.log('start listener');
            listenSubscriber = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 1
            }, onGetLocation);
            console.log('has listener');
        } catch (error) {
            setError('Location is needed obviously');
        }

    }

    useEffect(() => {
        if(isRecording){
            startWatch();
        } else if(listenSubscriber) {
            console.log('stop listener');
            listenSubscriber.remove();
        }
    }, [isRecording])

    return [locationErr];
}