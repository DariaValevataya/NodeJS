const express = require('express');
const app = express.Router();
const subjectService = require('../services/SubjectService')

app.get("/subjects", async (req, res) => {
    try {
        subjects = await subjectService.getSubjects();
        res.json(subjects);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.post("/subjects", async (req, res) => {
    try {
        const dataSub = req.query;
        const createdSub = await subjectService.createSubject(dataSub);
        res.json(createdSub);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.delete("/subjects/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const deletedSub = await subjectService.deleteSubject(id);
        res.json(deletedSub);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})

app.put("/subjects/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const dataSub = req.query;
        const updatedSub = await subjectService.updateSubject(id, dataSub);
        res.json(updatedSub);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
module.exports = app
