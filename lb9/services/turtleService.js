const { Turtle, Pizza } = require('../models');

class TurtleService {

    async getTurtles() {
        return await Turtle.findAll();
    }

    async getTurtleById(id) {
        if (isNaN(id)) {
            throw new Error('Введенный ID не является числом');
        }
        return await Turtle.findByPk(id);
    }

    async getTurtlesByFavoritePizza(pizzaName) {
        return await Turtle.findAll({
            include: [{
                model: Pizza,
                as: 'favoritePizza',
                where: { name: pizzaName }
            }]
        });
    }

    async createTurtle(turtle) {
              if (!turtle.name|| !turtle.color)//UNDEF
            throw new Error('Name, color должны быть определены');
        return await Turtle.create(turtle);
    }

    async updateTurtle(id, newTurtle) {
        if (isNaN(id) || !newTurtle.name|| !newTurtle.color )
            throw new Error('Введите все данные корректно');
        const turtle = await this.getTurtleById(id);
        return await turtle.update(newTurtle);
    }

    async deleteTurtle(id) {
        const turtle = await this.getTurtleById(id);
        return await turtle.destroy();
    }
}
module.exports = new TurtleService();
