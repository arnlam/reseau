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
    type: String,
    required: true
  },
  uri: String,
  like: [{id: String}]
});

const Article = Mongoose.model('articles', SchemaArticle);

module.exports = Article;