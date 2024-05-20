const express = require('express');
const app = express();
const path = require('path');
var session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
require('./local-passport-config');

app.use(session({
    secret: 'security',
    store: new FileStore(),
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 30 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false,

}));

app.use(passport.initialize())
app.use(passport.session())


app.get('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/resource')
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/resource');
    });


app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/login');
});

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/login')
    }
}

app.get('/resource', auth,
    (req, res) => {
        console.log(res)
        res.json('resource');
    }
);
app.use((req, res) => {
    res.status(404).send('Not found');
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});