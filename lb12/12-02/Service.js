const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkUserByUsernameAndPassword = async (username, password) => {
    return await prisma.user.findFirst({
        where: {
            username: username,
            password: password
        }
    });
};
const createUser = async (username, password) => {
    return await prisma.user.create(
        {
            data:
            {
                username: username,
                password: password
            }
        }
    )
};
const CheckUserById = async (id) => {
    return await prisma.user.findFirst({
        where: {
            id: id,
        }
    });
};
module.exports = { checkUserByUsernameAndPassword, createUser, CheckUserById }