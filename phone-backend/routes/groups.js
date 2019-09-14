const Group = require('../models/group')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const groups = await Group.find();
    res.send(groups);
  });

router.post('/', async (req, res) => {
      let group = new Group({ 
        name: req.body.name,
      });
      Result = await group.save();
      
      res.send(Result);
    });

    router.put('/:id', async (req, res) => {
    
        const group = await Group.findByIdAndUpdate(req.params.id,
          { 
          name: req.body.name
          }, { new: true });
        if (!group) return res.status(404).send('The contact with the given ID was not found.');
          res.send(group);
      });

    router.delete('/:id', async (req, res) => {
      const group = await Group.findByIdAndRemove(req.params.id);
      if (!group) return res.status(404).send('The group with the given ID was not found.');
      res.send(group);
    });

    router.get('/:id', async (req, res) => {
      const contact = await Contact.findById(req.params.id);
    
      if (!contact) return res.status(404).send('The contact with the given ID was not found.');
    
      res.send(contact);
    });

module.exports = router; 