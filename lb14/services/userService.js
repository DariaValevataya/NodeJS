const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async () => {

    return await prisma.users.findMany(
        {
            select:
            {
                username: true,
                email: true,
                role: true,
            }
        }
    );
}

const getUserById = async (id) => {

    return await prisma.users.findFirst({
        where: {
            id: id
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
        }
    });
}

const getUserByUsername = async (login) => {

    return await prisma.users.findFirst({
        where: {
            username: login
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
        }
    });
}

const createUser = async (username, password, role, email) => {
    
    return await prisma.users.create({
        data: {
            username: username,
            password: password,
            email: email,
            role: role
        }
    });
}

const checkUser = async (login, password) => {

    return await prisma.users.findFirst({
        where: {
            username: login,
            password: password
        }
    });
}

module.exports = { getAllUsers, getUserById, getUserByUsername, createUser, checkUser }