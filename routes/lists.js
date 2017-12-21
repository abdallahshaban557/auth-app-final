const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Lists = require('../models/lists');


//create new parent list
router.post('/addParentList', passport.authenticate('jwt', {session:false} ) , (req, res, next) => {
    let newParentList = new Lists({
      name: req.body.name.toLowerCase(),
      description: req.body.description,
      parent_list_id: req.body.parent_list_id,
      children_list_counter: 0,
      created_by: req.user._id
    });
    Lists.addParentList(newParentList, (err, user) => {
      if(err){
        res.json({success: false, msg:'Failed to add parent list'});
      } else {
        res.json({success: true, msg:'Parent list added'});
      }
    });
  });



  router.get('/getallParentList', passport.authenticate('jwt', {session:false} ) , (req, res, next) => {   
    Lists.find({parent_list_id:null}, function(err, lists){
        if (err) return handleError(err); //maybe display an error message to the user?
        res.json({success: true, msg:'retrieved parent lists', payload: lists});
    })
  });


  router.post


//If this line is not added, an error for the router is shown in the terminal
module.exports = router;