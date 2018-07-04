const Mongoose = require('mongoose');

const SchemaArticle = new Mongoose.Schema({
  articleId: Number,
  vues: Number
});

const Article = Mongoose.model('articles', SchemaArticle);

module.exports = Article;