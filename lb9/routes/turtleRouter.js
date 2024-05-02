const turtleService = require('../services/turtleService');
const express = require('express');
const app = express.Router();
app.get("/turtles", async (req, res) => {
    try {
        const { favoritePizza } = req.query;
        console.log('aaa', favoritePizza);
        if (favoritePizza) {
            turtles = await turtleService.getTurtlesByFavoritePizza(favoritePizza);
        }
        else {
            console.log('aaa');
            turtles = await turtleService.getTurtles();
            console.log('aaannnn');

        }
        res.json(turtles);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})

app.get("/turtles/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const turtle = await turtleService.getTurtleById(id);
        if (turtle)
            res.json(turtle);
        else
            res.json({ success: false, errors: "Черепашки с таким ID не существует в бд" });
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
})

app.post("/turtles", async (req, res) => {
    try {
        const infoTurtle = req.query;
        const newTurtle = await turtleService.createTurtle(infoTurtle);
        res.json(newTurtle);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});

app.put("/turtles/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const dataTurtle = req.query;
        const updateTurtle = await turtleService.updateTurtle(id, dataTurtle);
        res.json(updateTurtle);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});
app.put('/turtles/:id/favoritePizzaBind', async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const pizzaId = parseInt(req.query.pizzaId);
        const updatedTurtle = await turtleService.updateTurtle(id, { favoritePizzaId: pizzaId });
        res.json(updatedTurtle);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});

app.put('/turtles/:id/secondFavoritePizzaBind', async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const pizzaId = parseInt(req.query.pizzaId);
        const updatedTurtle = await turtleService.updateTurtle(id, { secondFavoritePizzaId: pizzaId });
        res.json(updatedTurtle);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});
app.put('/turtles/:id/weaponBind', async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const weaponId = parseInt(req.query.weaponId);
        const updatedTurtle = await turtleService.updateTurtle(id, { weaponId: weaponId });
        res.json(updatedTurtle);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});
app.delete("/turtles/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const deletedTurtle = await turtleService.deleteTurtle(id);
        res.json(deletedTurtle);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }

})
app.delete("/turtles/:id/weaponUnbind", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const updateTurtle = await turtleService.updateTurtle(id, { weaponId: null });
        res.json(updateTurtle);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }

});
app.delete("/turtles/:id/favoritePizzaUnbind", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const updateTurtle = await turtleService.updateTurtle(id, { favoritePizzaId: null });
        res.json(updateTurtle);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});
app.delete("/turtles/:id/secondFavoritePizzaUnbind", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const updateTurtle = await turtleService.updateTurtle(id, { secondFavoritePizzaId: null });
        res.json(updateTurtle);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});

module.exports = app

