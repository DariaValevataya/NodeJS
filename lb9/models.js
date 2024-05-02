const { Sequelize, Model, Op } = require("sequelize");

const sequelize = new Sequelize(
    'lb9',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mysql',
        define: {
            timestamps: false,
        },
        pool: {
            max: 10, //максимальное кол-во соединений в пуле (Default: 5)
            min: 0, //минимальное кол-во соединений в пуле (Default: 0)
            acquire: 30000, //время в миллисекундах, в течение которого будет осуществляться попытка установить соединение, прежде чем будет сгенерировано исключение (Default: 60000)
            idle: 10000, //время простоя в миллисекундах, по истечении которого соединение покинет пул (Default: 1000)
        }
    }
);
sequelize
    .authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((error) => console.log('Failed to connect the database:', error))
class Weapon extends Model { }
Weapon = sequelize.define("weapon", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
    },
    dps: {
        type: Sequelize.INTEGER,
    }
});
class Pizza extends Model { }

Pizza = sequelize.define("pizza", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
    },
    calories: {
        type: Sequelize.INTEGER,
    }
});
class Turtle extends Model { }
Turtle = sequelize.define("turtle", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
    },
    color: {
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.TEXT,
    },
});
Turtle.belongsTo(Weapon, { as: 'weapon' });
Turtle.belongsTo(Pizza, { as: 'favoritePizza' });
Turtle.belongsTo(Pizza, { as: 'secondFavoritePizza' });
Weapon.hasMany(Turtle, { foreignKey: 'weaponId' });
Pizza.hasMany(Turtle, { foreignKey: 'favoritePizzaId' });
Pizza.hasMany(Turtle, { foreignKey: 'secondFavoritePizzaId' });


sequelize.sync({ force: true })
    .then(() => {
        Weapon.create({ name: "Gun", dps: 10 })
        Weapon.create({ name: "AK-47", dps: 30 })
        Weapon.create({ name: "RPG-7", dps: 40 })
        Pizza.create({ name: "Margherita", calories: 845 })
        Pizza.create({ name: "Pepperoni", calories: 945 })
        Pizza.create({ name: "Cheese", calories: 1200 })
        transact();

        Turtle.create({
            name: "Raphael",
            color: "White",
            weaponId: 1,
            favoritePizzaId: 1,
            secondFavoritePizzaId: 2,
            image: "C:\\univer\\6semestr\\Node\\labs\\lb9\\images\\t4.jpg"
        })
        Turtle.create({
            name: "Donatello",
            color: "Green",
            weaponId: 2,
            favoritePizzaId: 2,
            secondFavoritePizzaId: 1,
            image: "C:\\univer\\6semestr\\Node\\labs\\lb9\\images\\t2.jpg"
        })
        Turtle.create({
            name: "Michelangelo",
            color: "Orange",
            weaponId: 3,
            favoritePizzaId: 3,
            secondFavoritePizzaId: 2,
            image: "C:\\univer\\6semestr\\Node\\labs\\lb9\\images\\t1.jpg"
        })
        Turtle.create({
            name: "Michelangelo",
            color: "Orange",
            weaponId: 3,
            favoritePizzaId: 3,
            secondFavoritePizzaId: 2,
            image: "C:\\univer\\6semestr\\Node\\labs\\lb9\\images\\t1.jpg"
        })
        console.log('Tables created successfully!');
    }).catch((error) => {
        console.error('Unable to create tables : ', error);
    });
    const transact = async () => {
    const t = await sequelize.transaction();
    try {
        await Pizza.update(
            { name:sequelize.literal("CONCAT(name, ' SUPER FAT!')") },
            {
                where: {
                    calories: {
                        [Op.gt]: 1500
                    }
                }
            },
            { transaction: t }
        );
        await t.commit()
    }
    catch (err) {
        await t.rollback();
        console.log('TransactionError: ', err);
    }

}
module.exports = { Turtle, Pizza, Weapon, transact };