const Mongoose = require('mongoose');

const SchemaCanal = new Mongoose.Schema({
  canalId: {
    type: String,
  },
  messages: [
    { 
      userId: String,
      creationDate: String,
      texte: String
    }
  ]
});

const Canal = Mongoose.model('canaux', SchemaCanal);

module.exports = Canal;