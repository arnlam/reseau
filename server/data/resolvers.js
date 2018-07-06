import Auteur from './models/auteur';
import Vue from './models/vue';
import Article from './models/article';

const resolvers = {
  Query: {
    // * AUTEURS QUERY * //
    async auteur(root, { _id }) {
      return await Auteur.findById(_id);
    },
    async tousLesAuteurs() {
      return await Auteur.find();
    },
    // * ARTICLES QUERY * //
    async article(root, { _id }) {
      return await Article.findById(_id);
    },
    async tousLesArticles() {
      return await Article.find();
    },
  },
  Mutation: {
    // * AUTEURS MUTATION * //
    async creerAuteur(root, { input }) {
      return await Auteur.create(input);
    },
    async updateAuteur(root, { _id, input }) {
      return await Auteur.findOneAndUpdate({ _id }, input, { new: true });
    },
    async supprimeAuteur(root, {_id}){
      return await Auteur.findOneAndRemove({_id});
    },
    // * ARTICLES MUTATION * //
    async creerArticle(root, { input }) {
      console.log({input})
      return await Article.create(input);
    },
    async updateArticle(root, { _id, input }) {
      return await Article.findOneAndUpdate({ _id }, input, { new: true });
    },
    async supprimeArticle(root, {_id}){
      return await Article.findOneAndRemove({_id});
    },
    async ajoutVue(root, {_id}){
      return await Article.findOneAndUpdate({_id}, (post) => post++, { new: true } );
    },
  },

  Article: {
    auteur(article) {
      return { id: 1, prenom: 'Hello', nom: 'World' };
    }
  }
};

export default resolvers;