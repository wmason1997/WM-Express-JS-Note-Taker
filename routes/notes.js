const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');


// GET Route for /api/notes should read the 'db.json' file and return all saved notes as JSON
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for /api/notes should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to client
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { noteTitle, noteText } = req.body;
  
    if (req.body) {
      const newNote = {
        noteTitle,
        noteText,
        tip_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

module.exports = router;