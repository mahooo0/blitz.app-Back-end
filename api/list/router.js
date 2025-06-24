const express = require('express');
const {
    GetListsByUserId,
    getlistDetail,
    createList,
    updateListTitle,
    DeleteList,
} = require('./controller');
const router = express.Router();

// GET all lists for a user
router.get('/:userId', GetListsByUserId);

// GET one lists for a user
router.get('/list-detail/:listId', getlistDetail);
// POST a new list for a user
router.post('/:userId', createList);

// PUT update a list title
router.put('/update/:listId', updateListTitle);

// DELETE a list
router.delete('/delete/:listId', DeleteList);

module.exports = router;
