const express = require('express');
const actionDb = require('./helpers/actionModel');

const router = express.Router();

//Create
router.post('/', (req, res) => {
    const info = req.body;
    actionDb.insert(info)
        .then(info => {
            res.status(201).json(info);
        })
        .catch(err => {
            res.status(500).json({ error: 'Unable to save action to database' });
        });
});

//Read
router.get('/', (req, res) => {
    const id = req.params.id;
    actionDb.get(id)
        .then(e => {
            res.status(200).json(e);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error retrieving actions from database' });
        });
});

//Update
router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    actionDb.update(id, changes)
        .then(changes => {
            if (changes) {
                res.status(200).json(changes);
            } else {
                res.status(404).json({ message: 'Action not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not update the database' });
        });
});
//Delete
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    actionDb.remove(id)
        .then(e => {
            if (e > 0) {
                res.status(200).json({ message: 'This action has been deleted' });
            } else {
                res.status(404).json({ message: 'Action not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Action could not be removed from database' });
        });
});

module.exports = router;