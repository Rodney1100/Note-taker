const express = require('express');
const app = express();
const PORT = process.env.PORT || "3001"

const  notes = require('./db/db.json')


app.get('/api/notes', (req, res) => {
  res.json(notes)
})


app.listen(PORT, () => {
  console.log("App is listening on Port: " + PORT);
});