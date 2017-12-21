const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Lists = require('../models/lists');


router.post('/addParentList', passport.authenticate('jwt', {session:false} ) , (req, res, next) => {
    let newParentList = new Lists({
      name: req.body.name.toLowerCase(),
      description: req.body.description.toLowerCase(),
      parent_list_id: req.body.parent_list_id.toLowerCase(),
      pachildren_list_counter: req.body.children_list_counter
    });
  
    Lists.addParentList(newParentList, (err, user) => {
      if(err){
        res.json({success: false, msg:'Failed to add parent list'});
      } else {
        res.json({success: true, msg:'Parent list added'});
      }
    });
  });


//If this line is not added, an error for the router is shown in the terminal
module.exports = router;