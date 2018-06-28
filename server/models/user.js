const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nom: String,
  prenom: String,
});

module.exports = UserSchema