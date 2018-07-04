const Mongoose = require('mongoose');

const SchemaVue = new Mongoose.Schema({
  articleId: Number,
  vues: Number
});

const Vue = Mongoose.model('vues', SchemaVue);

module.exports = Vue;