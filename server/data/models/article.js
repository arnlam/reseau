const Mongoose = require('mongoose');

const SchemaArticle = new Mongoose.Schema({
  texte: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  vues: Number,
  auteurId: String,
  creationDate: {
    type: Date,
    required: true
  }
});

const Article = Mongoose.model('articles', SchemaArticle);

module.exports = Article;