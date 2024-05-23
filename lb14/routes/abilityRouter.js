const express = require('express');
const AbilityRoute = express.Router();
AbilityRoute.get('/', async (req, res, next) => {
    if (req.ability) {
        res.status(200).send(req.ability.rules);
    }
    else {
        res.status(500).send('Error');
    }
});
module.exports = AbilityRoute