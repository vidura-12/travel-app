const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const createSchema = new Schema ({

  name : {
    type : string ,
    required : true
  },
  
  email : {
    type : string ,
    required : true
  },

  address : {
    type : string ,
    required : true
  },

  number : {
    type : string ,
    required : true
  },

  experience : {
    type : string ,
    required : true
  },

  language : {
    type : string ,
    required : true
  },

}
)

const create = mongoose.model("Create" , createSchema);
module.exports = create;