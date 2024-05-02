const express = require('express');
const app = express.Router();
const AuditoriumService = require('../services/AuditoriumService')

app.get("/auditoriums", async (req, res) => {
    try {
        auditoriums = await AuditoriumService.getAuditoriums();
        res.json(auditoriums);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.get("/auditoriumsSameCount", async (req, res) => {
    try {
        auditoriums = await AuditoriumService.getAuditoriumsSameCount();
        res.json(auditoriums);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.get("/transaction", async (req, res) => {
    try {
        await prisma.$transaction(async (prisma) => {
            const updatedAuditoriums = await prisma.AUDITORIUM.updateMany({
                data: {
                    auditoriumCapacity: { increment: 100 },
                },
            });
            const auditoriums = await prisma.auditorium.findMany();
            console.log(auditoriums);
            throw new Error("Transaction rollback");
        })
    }
    catch (err) {
            auditoriums = await AuditoriumService.getAuditoriums()
            console.log(auditoriums);
        }
    })
app.get("/auditoriumsWithComp1", async (req, res) => {
    try {
        auditoriums = await AuditoriumService.getauditoriumsWithComp1();
        res.json(auditoriums);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.post("/auditoriums", async (req, res) => {
    try {
        const dataAud = req.query;
        const createdAud = await AuditoriumService.createAuditorium(dataAud);
        res.json(createdAud);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
app.delete("/auditoriums/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const deletedAud = await AuditoriumService.deleteAuditorium(id);
        res.json(deletedAud);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})

app.put("/auditoriums/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const dataAud = req.query;
        const uodatedAud = await AuditoriumService.updateAuditorium(id, dataAud);
        res.json(uodatedAud);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})
module.exports = app
