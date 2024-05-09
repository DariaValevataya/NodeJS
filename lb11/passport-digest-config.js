const passport = require('passport');
const { DigestStrategy } = require('passport-http');
const Users = require('./users.json');

passport.use('digest', new DigestStrategy(
    { qop: 'auth' }, //Показатель качества защиты (qop) – указывает качество защиты, выбранное UAC: qop=auth,
    function (username, done) {
        const user = Users.find(u => u.username === username  );;
        if (user) {
            return done(null, user, user.password);
        } else {
            return done(null, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    const user = Users.find(u => u.username === username);
    done(null, user);
});