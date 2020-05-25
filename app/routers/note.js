const { 
    insertNote, 
    getAllNotes, 
    getNoteById, 
    updateNote,
    deleteNote 
} = require('../controllers/note');
const router = require('express').Router();

router.post('/', insertNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
