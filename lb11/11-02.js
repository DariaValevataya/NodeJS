const express = require('express');
const session = require('express-session');
const passport = require("passport");
const app = express();
require('./passport-digest-config');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

function deleteHeaderAuth(req, res, next) {
    if (req.session.logout && req.headers['authorization']) {
        req.session.logout = false
        delete req.headers['authorization']
    } 
        next();
}

app.get('/login', deleteHeaderAuth, passport.authenticate('digest', { session: false }), (req, res) => {
    res.redirect('/resource');
});

app.get('/logout', (req, res) => {
    req.session.logout = true;
    res.redirect('/login');

});

app.get('/resource', passport.authenticate('digest', { session: false }), (req, res) => {
    res.send('RESOURCE');
});
app.use((req, res, next) => {
    res.status(404).send('404');
});

app.listen(3000);