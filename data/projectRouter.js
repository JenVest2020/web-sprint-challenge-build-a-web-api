const express = require('express');
const projectDb = require('./helpers/projectModel');

const router = express.Router();

//Create
router.post('/', (req, res) => {
    const project = req.body;
    projectDb.insert(project)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error saving project to database' });
        });
});

//Read
router.get('/', (req, res) => {
    projectDb.get(req.id)
        .then(e => {
            res.status(200).json(e);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not retrieve project from database' });
        });
});
//Update
router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    projectDb.update(id, changes)
        .then(changes => {
            if (changes) {
                res.status(200).json(changes);
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Unable to update the database' });
        });
});

//Delete
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    projectDb.remove(id)
        .then(e => {
            if (e) {
                res.status(200).json({ message: 'The project has been deleted' });
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Project could not be removed from the database' });
        });
});
//get Actions
router.get('/:id/actions', (req, res) => {
    projectDb.getProjectActions(req.params.id)
        .then(e => {
            res.status(200).json(e);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not retrieve actions from database' });
        });
});


module.exports = router;