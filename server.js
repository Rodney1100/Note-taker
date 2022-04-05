const express = require('express');
const app = express();
const PORT = process.env.PORT || "3001"
const fs = require('fs')
const path = require('path');
// const { json } = require('stream/consumers');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const notes = require('./db/db.json')

// api for getting all notes
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// function for finding one note by id
function findById(id, notesArray) {
  const result = notesArray.filter(notes => notes.id === id)
  return result
}

// api for finding one note with id
app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes)
  if (result) {
    res.json(result)
  } else {
    res.send(404)
  }
})

// function for creating a new note
function createNewNote(body, notesArray) {
  const note = body
  notesArray.push(note)
  // writing to the db for notes
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify( notesArray, null, 2)
    )
    console.log(notesArray)
  return note
}


// api for creating a note
app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString();
  const note = createNewNote(req.body, notes)
  res.json(note)
})

// telling the app where to find my port.
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
