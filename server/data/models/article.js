const Mongoose = require('mongoose');

const SchemaArticle = new Mongoose.Schema({
  articleId: Number,
  texte: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  vues: Number,
  auteur: String
});

const Article = Mongoose.model('articles', SchemaArticle);

module.exports = Article;