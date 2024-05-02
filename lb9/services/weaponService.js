const { Weapon } = require('../models');
const { Op } = require('sequelize');

class WeaponService {
  async getWeapons() {
    return await Weapon.findAll();
  }

  async getWeaponById(id) {
    if (isNaN(id)) {
        throw new Error('Введенный ID не является числом');
    }
    return await Weapon.findByPk(id);
  }
  
  async getWeaponsByDps(operator, dps) {
    if(operator==='gt'){
      return await Weapon.findAll({
        where: {
          dps: {
            [Op.gt]: dps
          }
        }
      })
    }
    if(operator==='lt'){
      return await Weapon.findAll({
        where: {
          dps: {
            [Op.lt]: dps
          }
        }
      })
    }
    }

  async createWeapon(weaponData) {
    if (weaponData.dps > 500 || weaponData.name == '')
    throw new Error("Введите данные корректно");
    return await Weapon.create(weaponData);
  }

  async updateWeapon(id, weaponData) {
    if (weaponData.dps > 500 || weaponData.name == '' || isNaN(id))
    throw new Error("Введите данные корректно");
    const weapon = await this.getWeaponById(id);
    return await weapon.update(weaponData);
  }

  async deleteWeapon(id) {
    const weapon = await this.getWeaponById(id);
    return await weapon.destroy();
  }
}

module.exports = new WeaponService();
