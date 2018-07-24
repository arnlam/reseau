const Mongoose = require('mongoose');

const SchemaCommentaire = new Mongoose.Schema({
  articleId: {
    type:String,
    required: true
  },
  texte: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  auteurId: String,
  creationDate: {
    type: Date,
    required: true
  }
});

const Commentaire = Mongoose.model('commentaires', SchemaCommentaire);

module.exports = Commentaire;