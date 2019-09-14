const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  group: String,
  date: { type:Date, default:Date.now},
  email: String,
  company: String
});

const Contact = mongoose.model('contacts', contactSchema)
module.exports = Contact;