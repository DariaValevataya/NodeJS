const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const Users = require('./users.json');


passport.use(new BasicStrategy(
  function (username, password, cb) {
    const user = Users.find(user => user.username === username && user.password === password);
    if (user) {
      return cb(null, user)
    } else {
      return cb(null, false)
    }
  }));

