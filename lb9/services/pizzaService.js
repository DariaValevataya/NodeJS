const { Pizza } = require('../models');
const { Op } = require('sequelize');

class PizzaService {
  async getPizzas() {
    return await Pizza.findAll();
  }

  async getPizzaById(id) {
    if (isNaN(id)) {
        throw new Error('Введенный ID не является числом');
    }
    return await Pizza.findByPk(id);
  }

  async getPizzaByCalories(operator, m) {
    if(operator==='gt'){
      return await Pizza.findAll({
        where: {
          calories: {
            [Op.gt]: m
          }
        }
      });
    }
    if(operator==='lt'){
      return await Pizza.findAll({
        where: {
          calories: {
            [Op.lt]: m
          }
        }
      });
    }
  }

  async createPizza(pizza) {
    if (pizza.calories > 2000 || pizza.calories < 0 || pizza.name == '')
      throw new Error("Введите данные корректно");
    return await Pizza.create(pizza);
  }

  async updatePizza(id, pizzaInfo) {
    if (pizzaInfo.calories > 2000 || pizzaInfo.calories < 0 || pizzaInfo.name == '')
    throw new Error("Введите данные корректно");
    const pizza = await this.getPizzaById(id);
    return await pizza.update(pizzaInfo);
  }

  async deletePizza(id) {
    const pizza = await this.getPizzaById(id);
    return await pizza.destroy();
  }
}

module.exports = new PizzaService();
