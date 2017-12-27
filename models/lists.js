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
    type: String
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

//submit new  list
module.exports.addList = function(NewList, callback){
  NewList.save(callback);
}

module.exports.getListById = function(id, callback){
  Lists.findById(id, callback);
}

module.exports.incrementChildListCounter = function(list, callback){ 
  list.set({children_list_counter: ++list.children_list_counter });
  list.save(callback);
}

module.exports.decrementChildListCounter = function(list, callback){ 
  list.set({children_list_counter: --list.children_list_counter });
  list.save(callback);
}

module.exports.editListName = function(list, newName, callback){
  list.set({name: newName});
  list.save(callback);
};

