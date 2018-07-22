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
  auteurId: String
});

const Article = Mongoose.model('articles', SchemaArticle);

module.exports = Article;