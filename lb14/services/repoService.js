const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCommitById = async (commentId) => {

    return await prisma.commits.findUnique(
        {
            where: {
                id: Number(commentId)
            },

        }
    )
}

const getCommitsByRepoId = async (repoId) => {

    return await prisma.commits.findUnique(
        {
            where: {
                repoId: Number(repoId)
            }
        }
    )
}

const getCommitsOfRepo = async (id) => {

    return await prisma.commits.findMany(
        {
            where: {
                repoId: Number(id)
            },

        }
    )
}


const addCommitToRepo = async (id, message) => {

    return await prisma.commits.create(
        {

            data:
            {
                message: message,
                repoId: Number(id)
            }
        }
    )
}


const updateInfoAboutCommit = async (commitId, name) => {

    return await prisma.commits.update(
        {
            where:
            {
                id: Number(commitId)
            },

            data:
            {
                message: name,
            }
        }
    )
}

const deleteCommit = async (commentId) => {

    return await prisma.commits.delete(
        {
            where:
            {
                id: Number(commentId)
            }
        }
    )

}

const getRepos = async () => {

    return await prisma.repos.findMany()
};

const getRepoByID = async (id) => {

    return await prisma.repos.findFirst(
        {
            where:
            {
                id: Number(id),
            }
        }
    )
};

const getRepoByAuthorID = async (id, authorId) => {

    return await prisma.repos.findFirst(
        {
            where:
            {
                id: Number(id),
                authorId: Number(authorId)
            }
        }
    )
};

const addPepo = async (authorId, name) => {

    return await prisma.repos.create(
        {
            data:
            {
                name: name,
                authorId: Number(authorId)
            }
        }
    )
}

const changeRepoByID = async (id, name) => {

    return await prisma.repos.update(
        {
            where:
            {
                id: Number(id)
            },
            data: {
                name: name
            }
        }
    )
};

const deleteRepoByID = async (id) => {

    return await prisma.repos.delete(
        {
            where:
            {
                id: Number(id)
            }
        }
    )
};

module.exports = { getRepos, getRepoByID, addPepo, changeRepoByID, deleteRepoByID, addCommitToRepo, getCommitById, getCommitsByRepoId, updateInfoAboutCommit, getCommitsOfRepo, deleteCommit, getRepoByAuthorID }
