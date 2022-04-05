const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path');
const apiRouter = require('./routes/apiRouter')
const htmlRoutes = require ("./routes/htmlRoutes")
const PORT = process.env.PORT || "3001"

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRouter);
app.use('/', htmlRoutes);

// telling the app where to find my port.
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
