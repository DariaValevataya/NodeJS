const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const GITHUB_APP_ID = "35c7e3b55e2cc7fdfb03";
const GITHUB_APP_SECRET = '355ee5b42382b22ccb1c1b34e64dfd9fb32ab4f0';

passport.use(new GitHubStrategy(
    {
        clientID: GITHUB_APP_ID,
        clientSecret: GITHUB_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
)
);
passport.serializeUser((user, done) => {
    console.log('serializeUser: ', user)
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('deserializeUser: ', user)
    done(null, user);
});