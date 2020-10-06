const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const Track = mongoose.model('Track');

const trackRoutes = express.Router();

// use the requireAuth middleware for each route defined in this router
trackRoutes.use(requireAuth);

// get all tracks belonging to current user
trackRoutes.get('/tracks', (req, res) => {

    // user was put on req by requireAuth
    const userId = req.user._id;

    // using 'find' instead of 'findOne' will return more than 1 result,
    // but will also return an empty array if found no results.
    // we are looking for a Track record, with matching userId
    Track.find({ userId })
    .then(tracks => {
        res.send(tracks);
    });

});

/**
 * create new track for current user
 */
trackRoutes.post('/tracks', (req, res) => {

    const { name, locations } = req.body;

    // name should have default value if not provided, this is why im only checking for locations
    if(!locations){
        res.status(422).send('MUST PROVIDE LOCATIONS')
    }

    // create a new track using the Track model,
    // and associates it with the current user id (current user provided by requireAuth)
    const track = new Track({
        name,
        locations,
        userId: req.user._id
    });

    console.log('try save new track');
    // try and save the new track in DB
    track.save()
    .then(newRecord => {
        console.log('new track created');
        res.send(newRecord);
    })
    .catch(err => {
        console.log('throw track error');
        res.status(422).send(err.message);
    })

});

module.exports = trackRoutes;