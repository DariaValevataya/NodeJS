const pizzaService = require('../services/pizzaService');
const express = require('express');
const app = express.Router();
const transact=require("../models.js")

app.get('/pizzas', async (req, res) => {
    const {calories} = req.query;
    if (calories) {
        const [operator, m] = calories.split(' ');
        if ((operator === 'gt' || operator === 'lt') && !isNaN(m)) {
            const pizzas = await pizzaService.getPizzaByCalories(operator, m);
            res.json(pizzas);
        }
        else
            return res.status(404).json({ error: '404' });
    } else {
        const pizzas = await pizzaService.getPizzas();
        res.json(pizzas);
    }
});

app.get('/pizzas/:id', async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const pizza = await pizzaService.getPizzaById(id);
        res.json(pizza);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});

app.post('/pizzas', async (req, res) => {
    try {
        const newPizza = req.query;
        const createdPizza = await pizzaService.createPizza(newPizza);
        transact.transact();
        res.json(createdPizza);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});

app.put('/pizzas/:id', async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const pizzaData = req.query;
        const updatedPizza = await pizzaService.updatePizza(id, pizzaData);
        transact.transact();
        res.json(updatedPizza);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});

app.delete('/pizzas/:id', async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const deletedPizza = await pizzaService.deletePizza(id);
        res.json(deletedPizza);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: '404' });
    }
});

module.exports = app
