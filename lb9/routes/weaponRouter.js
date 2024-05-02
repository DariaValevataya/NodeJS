const weaponService = require('../services/weaponService');
const express = require('express');
const app = express.Router();


app.get('/weapons', async (req, res) => {
    const dpsQuery = req.query.dps;
    if (dpsQuery) {
        const [operator, dps] = dpsQuery.split(' ');
        if ((operator === 'gt' || operator === 'lt') && !isNaN(dps)) {
            const weapons = await weaponService.getWeaponsByDps(operator, dps);
            res.json(weapons);
        } else
            return res.status(404).json({ error: '404' });
    } else {
        const weapons = await weaponService.getWeapons();
        res.json(weapons);
    }
});


app.get('/weapons/:id', async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const weapon = await weaponService.getWeaponById(id);
        res.json(weapon);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});

app.post('/weapons', async (req, res) => {
    try {
        const newWeapon = req.query;
        const createdWeapon = await weaponService.createWeapon(newWeapon);
        res.json(createdWeapon);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});

app.put('/weapons/:id', async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const weaponData = req.query;
        const updatedWeapon = await weaponService.updateWeapon(id, weaponData);
        res.json(updatedWeapon);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});

app.delete('/weapons/:id', async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const deletedWeapon = await weaponService.deleteWeapon(id);
        res.json(deletedWeapon);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});

module.exports = app;

