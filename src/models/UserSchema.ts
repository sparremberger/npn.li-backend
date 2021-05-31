const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  links : [String]
})

/*userSchema.methods.getLinks = function() {
  return this.links;
}*/

// Da documentação do Mongoose:
// The first argument is the singular name of the collection your model is for. 
// Mongoose automatically looks for the plural, lowercased version of your model name. 
module.exports = mongoose.model('User', userSchema)

/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String
})

module.exports = mongoose.model('UserSchema', userSchema)*/
