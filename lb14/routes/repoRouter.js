const express = require('express');
const { getRepos, getRepoByID, addPepo, changeRepoByID, deleteRepoByID, addCommitToRepo, getCommitById, updateInfoAboutCommit, deleteCommit, getRepoByAuthorID, getCommitsOfRepo } = require('../services/repoService');
const RepoRoute = express.Router();

RepoRoute.post('/', async (req, res, next) => {
    if (req.ability.can('create', 'Repos')) {
        const { name } = req.body
        console.log(name + 'name')
        const repo = await addPepo(req.authInfo.id, name);
        res.json(repo)
    }
    else {
        res.status(403).json('Access deniend')
    }
})

RepoRoute.get('/', async (req, res, next) => {
    if (req.ability.can('read', 'Repos')) {
        const repos = await getRepos();
        res.json(repos)
    }
    else {
        res.status(403).json('Access deniend')
    }
})
RepoRoute.get('/:id', async (req, res, next) => {

    if (req.ability.can('manage', 'all')) {
        const { id } = req.params;
        const repo = await getRepoByID(id);
        if (repo) {
            return res.status(200).json(repo);
        }
        else {
            return res.status(404).json('Not found');
        }
    }

    if (req.ability.can('read', 'Repos', { authorId: req.authInfo.id })) {
        try {
            const { id } = req.params;
            const repo = await getRepoByAuthorID(id, req.authInfo.id)
            if (repo) {
                res.status(200).json(repo);
            }
            else {
                res.status(404).send('Not found');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json('Access deniend')
    }
})
RepoRoute.put('/:id', async (req, res, next) => {
    if (req.ability.can('manage', 'all')) {
        const { id } = req.params;
        const { name } = req.body;
        const repo = await getRepoByID(id);
        if (repo) {
            const repoUpd = await changeRepoByID(id, name)
            return res.status(200).json(repoUpd);
        }
        else {
            return res.status(404).json('Not found');
        }
    }
    if (req.ability.can('update', 'Repos', { authorId: req.authInfo.id })) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const repo = await getRepoByAuthorID(id, req.authInfo.id);
            if (repo) {
                const repoUpd = await changeRepoByID(id, name)
                return res.status(200).json(repoUpd);
            }
            else {
                return res.status(404).send('Not found');
            }
        }
        catch (err) {
            res.status(403).json(err);
        }
    }
    else {
        res.status(403).json('Access deniend')
    }

})

RepoRoute.delete('/:id', async (req, res, next) => {
    if (req.ability.can('manage', 'all')) {
        try {
            const { id } = req.params;
            //req.ability?.throwUnlessCan('manage', 'all');
            const repo = await deleteRepoByID(id);
            if (repo) {
                res.status(200).json(repo);
            }
            else {
                res.status(404).send('Not found');
            }
        }
        catch (err) {
            res.status(403).send(err);
        }
    }
    else {
        res.status(403).json('Access deniend')
    }
})




RepoRoute.get('/:id/commits', async (req, res, next) => {
    const { id } = req.params;
    try {
        const repo = await getRepoByID(id)
        if (!repo) {
            return res.status(404).send('Repository not found');
        }

        if (!req.ability.can('read', 'Commits', { authorId: repo.authorId })) {
            return res.status(403).send('Access denied');
        }
        const commits = await getCommitsOfRepo(id);
        if (commits) {
            res.status(200).json(commits);
        }

        else {
            res.status(404).send('Not found commits');
        }

    }
    catch (err) {
        res.status(403).json(err);
    }
})

RepoRoute.get('/:id/commits/:commitId', async (req, res, next) => {
    try {
        const { id, commitId } = req.params;
        const repo = await getRepoByID(id);
        if (!repo) {
            return res.status(404).send('Repository not found');
        }
        if (repo.authorId !== req.authInfo.id) {
            return res.status(403).send('Access denied');
        }
        const commit = await getCommitById(commitId);
        if (commit && commit.repoId === repo.id && req.ability.can('read', 'Commits', { authorId: repo.authorId })) {
            res.status(200).json(commit);
        }
        else {
            res.status(404).json('Not Found')
        }

    }
    catch (err) {
        res.status(403).send(err);
    }
})


RepoRoute.post('/:id/commits/', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        const repo = await getRepoByAuthorID(id, req.authInfo.id);

        if (repo && req.ability.can('create', 'Commits', { authorId: repo.authorId })) {
            const commit = await addCommitToRepo(id, message);
            console.log(commit)
            res.status(200).json(commit);
        }
        else {
            res.status(404).json('Not found');
        }
    }
    catch (err) {
        res.status(403).send(err);
    }

})


RepoRoute.put('/:id/commits/:commitId', async (req, res, next) => {
    if (req.ability.can('manage', 'all')) {

        const { id, commitId } = req.params;
        const { message } = req.body;
        const repo = await getRepoByID(id);
        if (repo) {
            const commit = await updateInfoAboutCommit(commitId, message);
            return res.status(200).json(commit);
        }
        else {
            return res.status(404).json('Not found');
        }
    }

    if (req.ability.can('update', 'Commits', { authorId: req.authInfo.id })) {
        try {
            const { id, commitId } = req.params;
            const { message } = req.body;
            const repo = await getRepoByAuthorID(id, req.authInfo.id);
            if (repo) {
                const commit = await updateInfoAboutCommit(commitId, message);
                res.status(200).json(commit);
            }
            else {
                res.status(404).json('Not found');
            }
        }
        catch (err) {
            res.status(403).send(err);
        }
    }
    else {
        res.status(403).json('Access deniend');
    }
})

RepoRoute.delete('/:id/commits/:commitId', async (req, res, next) => {
    if (req.ability.can('manage', 'all')) {
        try {
            const { id, commitId } = req.params;
            const repo = await getRepoByID(id);
            if (repo) {
                const delCommit = deleteCommit(commitId)
                res.status(200).json(delCommit);
            }
            else {
                res.status(404).json('Not found');
            }
        }
        catch (err) {
            res.status(403).send(err);
        }

    }
    else {
        res.status(403).json('Access deniend');
    }
})

module.exports = RepoRoute