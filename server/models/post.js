const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  author: String,
  creationDate: String,
  body: String
});

module.exports = PostSchema