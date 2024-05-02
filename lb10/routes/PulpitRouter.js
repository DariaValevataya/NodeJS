const express = require('express');
const app = express.Router();
const pulpitService = require('../services/PulpitService')
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/pulpits", async (req, res) => {
    try {
        pulpits = await pulpitService.getPulpits();
        res.json(pulpits);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.get("/getPulpitsWithTeacherCount", async (req, res) => {
    try {
        pulpitsWithTeacherCount = await pulpitService.getPulpitsWithTeacherCount();
        res.json(pulpitsWithTeacherCount);

    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.get("/puplitsWithoutTeachers", async (req, res) => {
    try {
        pulpits = await pulpitService.getPuplitsWithoutTeachers();
        res.json(pulpits);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.get("/pulpitsWithVladimir", async (req, res) => {
    try {
        pulpits = await pulpitService.getPuplitsWithVladimir();
        res.json(pulpits);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.post("/pulpits", async (req, res) => {
    try {
        const dataPulpit = req.body;
        console.log("fg" + dataPulpit)
        const createdPulpit = await prisma.pulpit.create({
            data: {
                pulpitName: dataPulpit.pulpitName,
                faculty: {
                    connectOrCreate: {
                        where: {
                            facId: dataPulpit.facId
                        },
                        create: {
                            facultyAbbr: dataPulpit.facultyAbbr,
                            facultyName: dataPulpit.facultyName
                        }
                    }
                },
            },
        })
        res.json(createdPulpit);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.delete("/pulpits/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const deletedPulpit = await pulpitService.deletePulpit(id);
        res.json(deletedPulpit);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})

app.put("/pulpits/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const dataPulpit = req.query;
        const updatedPulpit = await pulpitService.updatePulpit(id, dataPulpit);
        res.json(updatedPulpit);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
module.exports = app
