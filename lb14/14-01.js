const express = require('express');
const bodyParser = require("body-parser");
const fs = require("fs");
const casl = require('casl');
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const UsersRoute = require('./routes/userRouter');
const AbilityRoute = require('./routes/abilityRouter');
const ReposRoute = require('./routes/repoRouter');
const AuthRoute = require('./routes/authRouter');

app.use(cookieParser('secret'));
const ACCESS_SECRET = 'access-secret';

app.use((req, res, next) => {
    const { rules, can } = casl.AbilityBuilder.extract();
    const { accessToken } = req.cookies;
    if (accessToken) {
        try {
            const { username, role, id } = jwt.verify(accessToken, ACCESS_SECRET);
            req.authInfo = { username, role, id };
            if (req.authInfo.role === 'admin') {
                can('manage', 'all');
            }
            else if (req.authInfo.role === 'user') {
                can(['read', 'create', 'update'], ['Repos', 'Commits'], { authorId: req.authInfo.id });
                can('read', 'Users', { id: req.authInfo.id });
            }
        }
        catch (e) {
            delete req.authInfo;
        }
    }
    else {
        req.authInfo = { guest: true };
        can('read', ['Repos', 'Commits'], 'all');
    }
    req.ability = new casl.Ability(rules);
    next();
})


app.use('/auth/', AuthRoute); //+
app.use('/api/user', UsersRoute);//+
app.use('/api/ability', AbilityRoute);//+
app.use('/api/repos', ReposRoute);

app.listen(3000, () => {
    console.log(`Server started at http://localhost:3000`);
});