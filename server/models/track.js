const mongoose = require('mongoose');

// each point in a track has a timestamp and the following data:
const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
});

/**
 * a track schema as a string name with a default value,
 *
 * it has a userId, which is a reference to ids created by mongoose,
 * we use the ref property, to tell it to which model it is referring (the string name used in mongoose.model(NAME, SCHEMA))
 *
 * it has locations, which is an array of points.
 */
const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: 'Recorded Track'
    },
    locations: [pointSchema]
});

// we only need to register the trackSchema, since the pointSchema is used only here
// (this is also why we wrote both of them in the same file)
mongoose.model('Track', trackSchema);