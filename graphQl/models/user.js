const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const userSchema= new Schema({
  fname:String,
  lname:String,
  age:Number
})

module.exports= mongoose.model("User", userSchema)
