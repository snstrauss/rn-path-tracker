import createDataContext from './createDataContext';

const locationActions = {
    start: (state) => ({
        ...state,
        recording: true
    }),
    stop: (state) => ({
        ...state,
        recording: false
    }),
    add: (state, newLocation) => ({
        ...state,
        currentLocation: newLocation.coords,
        locations: [...state.locations, newLocation]
    })
};

const { Provider, Context } = createDataContext('location', locationActions, {
    recording: false,
    locations: [],
    currentLocation: null
});

const LocationProvider = Provider;

export const LocationContext = Context;
export default LocationProvider;