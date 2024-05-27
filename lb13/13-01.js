const express = require('express');
const passport = require('passport');
const session = require('express-session')
require('./config');

const app = express();

app.use(
    session({
        secret: "secret-github-session",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
    res.send('<a href="/auth/github">github authenticate</a>');
});

app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:profile'] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/resource');
    });

function Auth(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get('/resource', Auth,
    (req, res) => {
        res.send(`User: ${req.user.username}`);
    });

app.get('/logout', (req, res) => {
    req.logout(err => { });
    res.redirect('/login');
});
app.use((req, res, next) => {
    res.status(404).send('404');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});