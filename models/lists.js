const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// list Schema
const ListsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  parent_list_id: {
    type: Number
  },
  children_list_counter: {
    type: Number
  },
  done: {
    //0 for no, 1 for yes
    type: Boolean
  },
  created_by: {
    type: String
  } 
});

const Lists = module.exports = mongoose.model('Lists', ListsSchema);

// module.exports.getUserById = function(id, callback){
//   User.findById(id, callback);
// }

module.exports.addParentList = function(NewParentList, callback){
  NewParentList.save(callback);
}

