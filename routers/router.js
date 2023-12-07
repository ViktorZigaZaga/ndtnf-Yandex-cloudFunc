const express = require('express');
const charactersStore = require('../store/CharactersStore');
const initModel = require('../initModel');
const router = express.Router();
const error404 = require('../middleware/404');


initModel();

router.get('/api/characters', async (req, res) => {
    res.json(await charactersStore.getAll());
});

router.get('/api/character', 
    async (req, res, next) => {
        const id = req.query.id;
        const item = await charactersStore.get(id);
        if (!item) {
            return next(); 
        }
        return res.json(item); 
    }, 
    error404,
);

module.exports = router;
