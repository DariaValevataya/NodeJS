const express = require('express');
const jwt = require("jsonwebtoken");
const { checkUserByUsernameAndPassword, createUser, CheckUserById } = require('./Service');
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { AddTokenToBlackList, tokenInBlackList } = require("./redisService.js");

const app = express();


// Использование middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const ACCESS_SECRET = 'access-secret';
const REFRESH_SECRET = 'refresh-secret';


app.get('/auth/registration', (req, res) => {
    const rs = fs.createReadStream('registration.html');
    rs.pipe(res);
});


app.post('/auth/registration', async (req, res) => {
    const { username, password } = req.body;
    const user = await checkUserByUsernameAndPassword(username, password)
    console.log(username);
    if (!user) {
        await createUser(username, password);
        res.redirect('/auth/login');
    }
    else {
        res.status(400).json({ message: "User already exists" });
    }
});

app.get('/auth/login', (req, res) => {
    const rs = fs.createReadStream('login.html');
    rs.pipe(res);
});


app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await checkUserByUsernameAndPassword(username, password)
    if (user) {
        const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "24h" });
        const accessToken = jwt.sign({ id: user.id }, ACCESS_SECRET, { expiresIn: "10m" });
        res.cookie('refreshToken', refreshToken, { path: '/auth/' });
        res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: "strict", });
        res.redirect('/auth/resource');
    }
    else {
        res.redirect('/auth/login');
    }
});


app.get(`/auth/refresh-token`, async (req, res, next) => {

    const { refreshToken, accessToken } = req.cookies;

    if (!refreshToken || !accessToken)
        return res.status(401).json({ message: "Token not valid" });

    if (!await tokenInBlackList(refreshToken)) {
        try {
            const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
            const { id } = decoded;
            const user = await CheckUserById(id);
            if (!user) {
                return res.status(401).json({ error: 'Refresh token invalid' });
            }
            else {
                await AddTokenToBlackList(refreshToken);
                const newAccessToken = jwt.sign({ id: user.id }, ACCESS_SECRET, { expiresIn: "10m" });
                const newRefreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "24h" });
                res.cookie('accessToken', newAccessToken, { httpOnly: true, sameSite: "strict", });
                res.cookie('refreshToken', newRefreshToken, { path: '/auth/' });
                res.redirect('/auth/resource');
            }
        }
        catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        }

    }
    else{
        return res.status(401).json({ error: 'Refresh token in BlackList' });
    }
});

app.get('/auth/logout', async (req, res) => {
    const { refreshToken } = req.cookies;
    console.log('logout', refreshToken);
    await AddTokenToBlackList(refreshToken);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', { path: '/auth/' })
    res.redirect('/auth/login');
});

app.get('/auth/resource', async (req, res, next) => {
    const { accessToken } = req.cookies;
    console.log(accessToken, 'resourse ')
    console.log(req.cookies.refreshToken, 'resourse ')

    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorithed" });
    }
    else {
        try {
            const decoded = jwt.verify(accessToken, ACCESS_SECRET);
            const { id } = decoded;
            const user = await CheckUserById(id);
            res.json('resource for ' + user.username)
        }
        catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        }
    }
});

app.use((req, res, next) => {
    res.status(404).send('Not found');
});


app.listen(3000, () => {
    console.log(`Server started at http://localhost:3000`);
});

