const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
/**
 * mongoose can be used to define a model -
 * a schema that defines what kind of objects can be stored in our DB.
 * in this case, we have a required and unique string username,
 * and a required string password.
 *
 * trying to add to the db a user record with no username/password,
 * or with a previously used username,
 * will throw an error.
 *
 * defining a user Model will automatically create a Users collection on the DB.
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

/**
 * we can define a pre-save hook, that will run before each new user save
 * because the user object will be available on 'this',
 * we HAVE to use the 'function' keyword (instead of an arrow function), for the callback
 */
userSchema.pre('save', function(next){
    console.log('pre save running');
    const user = this;

    // if the user password is not modified - continue without performing any action
    if(!user.isModified('password')) {
        return next();
    }

    console.log('generating salt');
    // generate a salt, with 'strongness' of 10
    bcrypt.genSalt(10, (err, salt) => {
        console.log('salt: ' + salt);
        // don't do anything if error
        if(err){
            return next(err);
        }

        console.log('hashing password:');
        // hash the user password using the salt
        bcrypt.hash(user.password, salt, (err, hash) => {

            console.log('hash: ' + hash);
            // do nothing if error
            if(err){
                return next(err);
            }

            // if everything is ok, replace the user password value with the hash, then continue
            user.password = hash;
            next()
        });
    });
});

// we can define custom methods to belong to our user model.
// this example is a method to compare the hashed login password with the user's actual hashed password
userSchema.methods.comparePassword = function(candidatePassword){

    // we have to use the 'function' keyword because user model is in 'this'
    const user = this;

    // bcrypt library works with callbacks, so we build our own promise just so the code will be nicer
    return new Promise((resolve, reject) => {

        // use bcrypt to compare the passed in password, with the users actual hashed password
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {

            if(err){
                return reject(err);
            }

            if(!isMatch){
                return reject(false);
            }

            resolve(true);

        });
    });
};

// the schema is defined as a 'User' model.
mongoose.model('User', userSchema);