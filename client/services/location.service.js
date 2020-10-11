import * as Location from 'expo-location';

const TEN_METERS = 0.0001;

let ptCount = 0;

function getDelta(idx){
    return idx * TEN_METERS;
}

function getPoint(idx){
    const delta = getDelta(idx);

    return {
        timestamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: 34.7804667 + delta,
            latitude: 32.0513884 + delta
        }
    };
}

let intervalRef;
export function startMock(){

    console.log('start mock');

    intervalRef = setInterval(() => {
        console.count('interval');
        Location.EventEmitter.emit('Expo.locationChanged', {
            watchId: Location._getCurrentWatchId(),
            location: getPoint(ptCount++)
        });
    }, 500);
}

export function stopMock(){
    console.log('stop mock');
    clearInterval(intervalRef);
}

export default {
    startMock,
    stopMock
}