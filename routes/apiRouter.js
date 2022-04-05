const path = require('path')
const fs = require('fs')
const router = require('express').Router()
const notes = require('../db/db.json')

// api for getting all notes
router.get('/notes', (req, res) => {
  res.json(notes)
})

// function for finding one note by id
function findById(id, notesArray) {
  const result = notesArray.filter(notes => notes.id === id)
  return result
}

// api for finding one note with id
router.get('/notes/:id', (req, res) => {
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
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(notesArray, null, 2)
  )
  console.log(notesArray)
  return note
}

// api for creating a note
router.post('/notes', (req, res) => {
  req.body.id = notes.length.toString();
  const note = createNewNote(req.body, notes)
  res.json(note)
})

// deleting a note

module.exports = router