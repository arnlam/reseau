const Mongoose = require('mongoose');


const SchemaAuteur = new Mongoose.Schema({
  id: Number,
  prenom: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  articles: Array
});

const Auteur = Mongoose.model('auteurs', SchemaAuteur);


// at the bottom, add View to the exports
module.exports = Auteur;