const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },

  });

  module.exports = mongoose.model('user',UserSchema)
  
  /*model ki help se CRUD operations kr 
  sakte hai on the mongoDB with the 
  help of mongoose*/