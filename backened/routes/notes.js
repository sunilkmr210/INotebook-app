const router = require('express').Router();
const Note = require('../models/Note');
const {verifyAndAuth} = require('./verifytoken');
const {body, validationResult} = require('express-validator');

//Route for getting notes
router.get('/fetchNote', verifyAndAuth, async (req, res)=>{
    try{
        const notes = await Note.find({user: req.user.id});
        res.status(200).json(notes);
    }
    catch(err){
        res.status(400).json(err);
    }
})

//Adding a new note
router.post('/addNote/:id', verifyAndAuth, [
    body('title', 'Enter a valid title').isLength({min: 3}),
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json(errors);
    }
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id
    })

    try{
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    }
    catch(err){
        res.status().json(err);
    }

});


//Updating an existing note
router.put('/updateNote/:id', verifyAndAuth, async (req, res)=>{
    const {title, description, tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    try{
        const updatednote = await Note.findByIdAndUpdate(req.params.id, {
            $set: newNote
        }, {new: true});
        if(!updatednote){
            res.status(400).json("Not found");
        }
        res.status(201).json(updatednote);
    }
    catch(err){
        res.status(400).json(err);
    }
    
})

//Deleting a note

router.delete('/deleteNote/:id', verifyAndAuth, async (req, res)=>{
    try{
        const note = await Note.findByIdAndDelete(req.params.id) 
        res.json("Note has been deleted");
    }
    catch(err){
        res.status(403).json(err);
    }
})

module.exports = router;