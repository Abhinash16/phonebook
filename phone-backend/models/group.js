const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,
});

const Group = mongoose.model('groups', groupSchema)
module.exports = Group;