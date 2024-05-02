const express = require('express');
const app = express.Router();
const AuditoriumTypeService = require('../services/AuditoriumTypeService')

app.get("/auditoriumtypes", async (req, res) => {
    try {
        auditoriums = await AuditoriumTypeService.getAuditoriumTypes();
        res.json(auditoriums);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.get("/auditoriumtypes/:id/auditoriums", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        auditoriums = await AuditoriumTypeService.getAuditoriumTypesWithAuditories(id);
        res.json(auditoriums);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.post("/auditoriumtypes", async (req, res) => {
    try {
        const dataAud = req.query;
        const createdAud = await AuditoriumTypeService.createAuditoriumType(dataAud);
        res.json(createdAud);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.delete("/auditoriumtypes/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const deletedAud = await AuditoriumTypeService.deleteAuditoriumType(id);
        res.json(deletedAud);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})

app.put("/auditoriumtypes/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const dataAud = req.query;
        const uodatedAud = await AuditoriumTypeService.updateAuditoriumType(id, dataAud);
        res.json(uodatedAud);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
module.exports = app
