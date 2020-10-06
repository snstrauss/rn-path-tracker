// we used a simple require for the user model file, just to make it run and register the model
require('./models/user');
require('./models/track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middleware/requireAuth');
const trackRoutes = require('./routes/trackRoutes');

// MONGO_URI generated and copied from cloud.mongodb.com, where the instance is actually living
const MONGO_URI = 'mongodb+srv://mongoAdmin:mongoPassword@sush-cluster.yjndg.mongodb.net/pathTracker?retryWrites=true&w=majority';
const PORT = 3333;

const app = express();

// bodyParser adds the data received in 'body' of POST request to req.body
app.use(bodyParser.json());
// routes related to user access - signup, sign-in etc...
app.use(authRoutes);
// routes related to tracks - creating, adding etc..
app.use(trackRoutes);

console.log('try connect to mongoDB');
// connect to mongo instance
// mongoose is a tool used for easy access to mongoDb instances
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
});

// events for successful/unsuccessful connection
mongoose.connection.on('connected', () => {
    console.log('got connection to mongoDB!');
});
mongoose.connection.on('error', (err) => {
    console.error('got error from mongoDB:', err);
})

// test route
app.get('/', (req, res) => {
    console.log('got request');

    res.send('hi : )');
});

// a middleware (requireAuth) can be used for all calls, with app.use(middleware),
// or it can be used only for specific route calls, by providing it as a second argument
app.get('/restricted', requireAuth, (req, res) => {

    // req.user was attached to the req object in the requireAuth middleware
    console.log('in request, req.user:');
    console.log(req.user);

    res.send(`user ${req.user.username} is verified!!`);

})

app.listen(PORT, () => {
    console.log('listening to port ' + PORT);
});