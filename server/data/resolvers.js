import Auteur from './models/auteur';
import Vue from './models/vue';
import Article from './models/article';
import { PubSub } from 'graphql-subscriptions';
import shortid from 'shortid';
const pubsub = new PubSub();
  
const resolvers = {
  Query: {
    // * AUTEURS QUERY * //
    async auteur(root, { id }) {
      return await Auteur.findOne(id);
    },
    async tousLesAuteurs() {
      return await Auteur.find();
    },
    // * ARTICLES QUERY * //
    async article(root, { id }) {
      return await Article.findOne(id);
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
    async updateAuteur(root, { id, input }) {
      return await Auteur.findOneAndUpdate({ id }, input, { new: true });
    },
    async supprimeAuteur(root, { id }){
      return await Auteur.findOneAndRemove({ id });
    },
    // * ARTICLES MUTATION * //
    async creerArticle(root, { input }, context) {
      console.log({input})
      const message = {
        texte: input.texte,
        id: shortid.generate()
      }
      await Article.create(message);
      console.log(message)
      pubsub.publish('articleAjoute', { articleAjoute: message })
      return message
    },
    async modifierArticle(root, { id, input }) {
      return await Article.findOneAndUpdate({ id }, input, { new: true });
    },
    async supprimeArticle(root, { id }){
      return await Article.findOneAndRemove({id});
    },
    async ajoutVue(root, { id }){
      return await Article.findOneAndUpdate({id}, (post) => post++, { new: true } );
    },
  },
  Subscription: {
    articleAjoute: {
      subscribe: () => pubsub.asyncIterator('articleAjoute')
    },
  },
  // 
  Article: {
    auteur(article) {
      return { id: 1, prenom: 'Hello', nom: 'World' };
    }
  },

};

export default resolvers;