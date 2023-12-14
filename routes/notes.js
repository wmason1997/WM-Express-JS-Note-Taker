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
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

notes.delete('/:id', (req, res) => {
    console.log(req.params.id);

    // filter out note we want to delete
    readFromFile('./db/db.json').then((data) =>  {
        const updatedNotes = JSON.parse(data).filter(note => note.id != req.params.id);

    // want to write updatedNotes to file
        writeToFile('./db/db.json', updatedNotes);
        res.json("Note deleted successfully");

    });

    // want to write updatedNotes to file

})

module.exports = notes;