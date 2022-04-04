const express = require('express');
const app = express();
const PORT = process.env.PORT || "3001"

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const notes = require('./db/db.json')


app.get('/api/notes', (req, res) => {
  res.json(notes)
})

function findById(id, notesArray) {
  const result = notesArray.filter(notes => notes.id === id)
  return result
}

app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes)
  if (result) {
    res.json(result)
  } else {
    res.send(404)
  }
}
)

app.post('/api/notes', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});