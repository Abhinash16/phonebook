const Contact = require('../models/contact')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.send(contacts);
});

router.post('/', async (req, res) => {
      let contact = new Contact({ 
        name: req.body.name,
        phone: req.body.phone,
        group: req.body.group,
        email: req.body.email,
        company: req.body.company
      });
      Result = await contact.save();
      
      res.send(Result);
    });
    router.put('/:id', async (req, res) => {
    
      const contact = await Contact.findByIdAndUpdate(req.params.id,
        { 
        name: req.body.name,
        phone: req.body.phone,
        group: req.body.group,
        email: req.body.email,
        company: req.body.company
        }, { new: true });
      if (!contact) return res.status(404).send('The contact with the given ID was not found.');
        res.send(contact);
    });

    router.delete('/:id', async (req, res) => {
      const contact = await Contact.findByIdAndRemove(req.params.id);
      if (!contact) return res.status(404).send('The contact with the given ID was not found.');
      res.send(contact);
    });

    router.get('/:id', async (req, res) => {
      const contact = await Contact.findById(req.params.id);
    
      if (!contact) return res.status(404).send('The contact with the given ID was not found.');
    
      res.send(contact);
    });

module.exports = router; 