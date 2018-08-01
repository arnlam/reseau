const Mongoose = require('mongoose');


const SchemaAuteur = new Mongoose.Schema({
  id: String,
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  prenom: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  avatar: {
    type:String,
    default: "http://arnaudlambert.info/img/default.png"
  },
  password: {
    type:String,
    required: true
  },
  ville: {
    type: String
  },
  amis: [{
    id: String
  }],
  demandesEnAttente: [{
    id: String
  }],
  demandesEnvoyees: [{
    id: String
  }],
  creationDate: {
    type: Date,
    required: true
  },
  chat: Array
});

// SchemaAuteur.pre('create', function (next) {
//   var user = this;
//   console.log('PREEE')
//   if (this.isModified('password') || this.isNew) {
//       bcrypt.genSalt(10, function (err, salt) {
//           if (err) {
//               return next(err);
//           }
//           bcrypt.hash(user.password, salt, null, function (err, hash) {
//               if (err) {
//                   return next(err);
//               }
//               user.password = hash;
//               console.log(user.password)
//               next();
//           });
//       });
//   } else {
//       return next();
//   }
// });

// SchemaAuteur.methods.comparePassword = function (passw, cb) {
//   bcrypt.compare(passw, this.password, function (err, isMatch) {
//       if (err) {
//           return cb(err);
//       }
//       cb(null, isMatch);
//   });
// };

const Auteur = Mongoose.model('auteurs', SchemaAuteur);


// at the bottom, add View to the exports
module.exports = Auteur;