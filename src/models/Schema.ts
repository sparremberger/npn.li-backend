const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  links : [String]
})

const linkSchema = new Schema({
  link : String,
  originalUrl : String,
  clicks : Number
})

const tokenSchema = new Schema({
  token : String,
  email : String
})

/*userSchema.methods.getLinks = function() {
  return this.links;
}*/

// Da documentação do Mongoose:
// The first argument is the singular name of the collection your model is for. 
// Mongoose automatically looks for the plural, lowercased version of your model name. 
module.exports = { User : mongoose.model('User', userSchema), Link : mongoose.model('Link', linkSchema), Token : mongoose.model('Tokens', tokenSchema) }
