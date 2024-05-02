const express = require('express');
const app = express.Router();
const facultyService = require('../services/FacultyService')
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/faculties", async (req, res) => {
    try {
        faculty = await facultyService.getFaculties();
        res.json(faculty);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.get("/faculties/:id/pulpitsByFaculty", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        pulpit = await facultyService.getPulpitsByFaculty(id);
        res.json(pulpit);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.get("/faculties/:id/subjects", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        faculty = await facultyService.getFacultyWithSubjects(id);
        res.json(faculty);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.post("/faculties", async (req, res) => {
    try {
        const fac = req.body;
        console.log("cv"+fac)
        const createdFac = await prisma.faculty.create({
            data: {
                facultyAbbr: fac.facultyAbbr,
                facultyName: fac.facultyName,
                pulpits: {
                    create: fac.pulpits || []
                },
            },
            include: { pulpits: true }
        })
         res.json(createdFac);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.delete("/faculties/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const deletedFac = await facultyService.deleteFaculty(id);
        res.json(deletedFac);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})

app.put("/faculties/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const dataFac = req.query;
        const updatedFac = await facultyService.updateFaculty(id, dataFac);
        res.json(updatedFac);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})


module.exports = app

