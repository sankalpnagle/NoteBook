const express = require("express");
const router = express.Router();

const { createNote, myNotes, updateNote, deleteNote, activepost, unactivepost } = require('../controller/notesController');
const requireLogin = require("../middleware/requireLogin");

router.post('/createnote', requireLogin, createNote);
router.get('/notes/:id', requireLogin, myNotes);
router.put('/update/:id', requireLogin, updateNote);
router.delete('/delete/:id', requireLogin, deleteNote);
router.put('/active/:id', requireLogin, activepost);
router.put('/unactive/:id', requireLogin, unactivepost);
router.get('/getnote/:id', requireLogin, unactivepost);

module.exports = router