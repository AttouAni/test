const express = require('express');
const router = express.Router();
const Set = require('../models/set');
const User = require('../models/user');
const Exercice = require('../models/exercice');
const mongoose = require('mongoose');

router.post('/:user_id', async (req, res) => {
    try {
      const { reps, weight, exercice_id } = req.body;
      
      const { user_id } = req.params;
  console.log(user_id);
  
    const id = new mongoose.Types.ObjectId(user_id);
    
    const user = await User.findById({_id: user_id});

    console.log(req.params);

    if (!reps || !weight || !exercice_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }


    console.log("exercice",exercice_id);
    
    const newSet = new Set({ reps, weight, exercice_id: new mongoose.Types.ObjectId(exercice_id) });
    await newSet.save();

    console.log(newSet);
    

    // const exercice = await Exercice.findById(exercice_id);

    // console.log(exercice);

    // exercice.sets.push(newSet._id);

    // await exercice.save();

    // user.exercices.push(exercice._id);

    // await user.save();


    // console.log();
    

    //user.set.push();
    
    return 
    

      
  
      res.status(201).json(newSet);
    } catch (error) {
      console.error('Error creating set:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/latest/:exercice_id', async (req, res) => {
    try {
      const { exercice_id } = req.params;
  
     
      const latestSet = await Set.findOne({ exercice_id })
        .sort({ _id: -1 }); 
  
      if (!latestSet) {
        
        return res.status(200).json({ reps: 0, weight: 0 });
      }
  
      res.status(200).json(latestSet);
    } catch (error) {
      console.error('Error fetching latest set:', error.message);
    
    }
  });
module.exports = router;
