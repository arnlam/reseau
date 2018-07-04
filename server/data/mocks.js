const casual = require('casual');


const mocks = {
  String: () => 'It works!',
  Query: () => ({
    auteur: (root, args) => {
      return { prenom: args.prenom, nom: args.nom };
    },
  }),
  Auteur: () => ({ prenom: () => casual.first_name, nom: () => casual.last_name }),
  Article: () => ({ titre: casual.title, texte: casual.sentences(1), vues: casual._building_number }),
};

module.exports = mocks;