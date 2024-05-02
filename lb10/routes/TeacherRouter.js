const express = require('express');
const app = express.Router();
const TeacherService = require('../services/TeacherService')

app.get("/teachers", async (req, res) => {
    try {
        teachers = await TeacherService.getTeachers();
        res.json(teachers);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.post("/teachers", async (req, res) => {
    try {
        const dataTeach = req.query;
        const createdTeach = await TeacherService.createTeacher(dataTeach);
        res.json(createdTeach);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.delete("/teachers/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const deletedTeach = await TeacherService.deleteTeacher(id);
        res.json(deletedTeach);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})

app.put("/teachers/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const dataTeach = req.query;
        const uodatedTeach = await TeacherService.updateTeacher(id, dataTeach);
        res.json(uodatedTeach);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
module.exports = app
