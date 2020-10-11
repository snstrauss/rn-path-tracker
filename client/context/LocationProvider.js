import createDataContext from './createDataContext';

const locationActions = {
    start: (state, payload) => {

        debugger;

    },
    stop: (state, payload) => {

        debugger;

    },
    add: (state, newLocation) => {
        return {
            ...state,
            currentLocation: newLocation.coords,
            locations: [...state.locations, newLocation]
        }
    }
};

const { Provider, Context } = createDataContext('location', locationActions, {
    recording: false,
    locations: [],
    currentLocation: null
});

const LocationProvider = Provider;

export const LocationContext = Context;
export default LocationProvider;