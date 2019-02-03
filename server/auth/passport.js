const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const User = mongoose.model('user');



var opts = {};
opts.secretOrKey = 'secret';
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = passport => {
    passport.use( //returns payload obj defined in users section (id and pass) and 'done'
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
            .then(user => {
            if(user){
                return done(null, user);
            }
            return done(null, false);
            })
            .catch(err => console.log(err))
        })
    )    
}

// ^^^ When payload is returned, the (req, res) req will contain the user itself.

