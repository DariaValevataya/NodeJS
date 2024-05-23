const express = require('express');
const AuthRoute = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { checkUser, createUser, getUserById } = require('../services/userService');
const ACCESS_SECRET = 'access-secret';


AuthRoute.get('/register', (req, res) => {
    const rs = fs.createReadStream('register.html');
    rs.pipe(res);
});

AuthRoute.post('/register', async (req, res) => {
    const { username, password, role, email } = req.body;
    const user = await checkUser(username, password)
    if (!user) {
        await createUser(username, password, role, email);
        res.redirect('/auth/login');
    }
    else {
        res.status(400).json({ message: "User already exists" });
    }
});

AuthRoute.get('/login', (req, res) => {
    const rs = fs.createReadStream('login.html');
    rs.pipe(res);
});

AuthRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await checkUser(username, password)
    if (user) {
        const accessToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, ACCESS_SECRET, { expiresIn: "1h" });
        res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: "strict", });
        res.redirect('/auth/resource');
    }
    else {
        res.redirect('/auth/login');
    }
});

AuthRoute.get('/resource', async (req, res, next) => {
    const { accessToken } = req.cookies;
    console.log(accessToken)
    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorithed" });
    }
    else {
        try {
            const decoded = jwt.verify(accessToken, ACCESS_SECRET);
            const { id } = decoded;
            const user = await getUserById(id);
            res.json('resource for ' + user.username)
        }
        catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        }
    }
});
AuthRoute.get('/logout', async (req, res) => {
    res.clearCookie('accessToken');
    res.redirect('/auth/login');
});

module.exports = AuthRoute