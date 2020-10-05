
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');

/**
 * a middleware is a function that runs before each/some of the routes calls,
 * and can modify the req/res objects.
 *
 * if something is wrong, a res can be sent, specifying a status and the problem.
 * if everything is alright, next() is called, to run the next middleware or the route call itself
 */
function requireAuth(req, res, next){
    // authorization === 'Bearer jwt'
    const { authorization } = req.headers;

    console.log('auth header: ');
    console.log(authorization);

    // if Authorization header is missing - respond with error
    if(!authorization){
        return res.status(401).send('You are not signed in');
    }

    // take just the token from the header
    const token = authorization.replace('Bearer ', '');

    // verify the correctness of the token, using our secret key
    // if the token is valid, we get the payload
    console.log('verify token:')
    jwt.verify(token, 'SECRET_KEY', (err, payload) => {

        if(err){
            console.log('invalid token!');
            return res.status(401).send(err.message);
        }

        console.log('payload:');
        console.log(payload);

        const { userId } = payload;

        // search DB (using the User model) for a user with this _id (used as index)
        // once found, the user data is attached to the 'req' object,
        // and will be available to the route call itself
        User.findById(userId).then((user) => {
            console.log('user:');
            console.log(user);

            req.user = user;

            // don't forget to call next() to continue with the call!
            next();
        })
    });

}

module.exports = requireAuth;