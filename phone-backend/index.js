const mongoose = require('mongoose');
const express = require('express');
const app = express();
const contacts = require('./routes/contacts');
const groups = require('./routes/groups');


mongoose.connect('mongodb://localhost/phonebook')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());

app.use('/api/contacts', contacts);
app.use('/api/group', groups);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));