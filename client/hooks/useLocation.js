import { Accuracy, requestPermissionsAsync, watchPositionAsync } from "expo-location";
import { useEffect, useState } from "react";
import { mockLocationChange } from "../services/location.service";

let stopInterval;
let listenSubscriber;
export default function useLocation(onGetLocation, isRecording){

    const [locationErr, setError] = useState();

    async function startWatch(){
        try {
            await requestPermissionsAsync();
            listenSubscriber = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 1
            }, onGetLocation);

            stopInterval = mockLocationChange();
        } catch (error) {
            setError('Location is needed obviously');
        }

    }

    useEffect(() => {
        if(isRecording){
            startWatch();
        } else if(stopInterval) {
            stopInterval()
            listenSubscriber.remove();
        }
    }, [isRecording])

    return [locationErr];
}