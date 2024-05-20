const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./users.js').users;

passport.use('local', new LocalStrategy(
    (username, password, done) => {
        for (let user of users) {
            if (username === user.username && password === user.password)
                return done(null, user);
        }
        return done(null, false, { message: "Wrong username or password" });
    }
));
passport.serializeUser((user, done) => {
    console.log('serializeUser:', user)
    done(null, user.username);
});

passport.deserializeUser((user, done) => {
    console.log('deserializeUser:', user)
    done(null, user);
});

