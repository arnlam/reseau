import Auteur from './models/auteur';
import Vue from './models/vue';
import Article from './models/article';
import Commentaire from './models/commentaire';
import { PubSub } from 'graphql-subscriptions';
import shortid from 'shortid';
const moment = require ('moment');
const bcrypt = require('bcrypt')
const pubsub = new PubSub();
const settings = require('../config/settings');
const jsonwebtoken = require('jsonwebtoken');
  
const resolvers = {
  Query: {
    // * AUTEURS QUERY * //
    async auteur(root, { id }) {
      return await Auteur.findOne({id:id});
    },
    async tousLesAuteurs() {
      return await Auteur.find();
    },
    // * ARTICLES QUERY * //
    async article(root, { id }) {
      return await Article.findOne(id);
    },
    async tousLesArticles(root, args) {
      return await Article.find().sort({creationDate:-1}).limit(args.first);
    },
    async commentaires(article){
      console.log('iii')
      return await Commentaire.find(article.articleId);
    }
  
  },
  Mutation: {
    // * AUTEURS MUTATION * //
    async creerAuteur(root, { input }) {
      Object.assign(input, {
        id: shortid.generate(),
        password: await bcrypt.hash(input.password, 10),
        creationDate: moment().toISOString()})
      // try{
        return await Auteur.create(input);
    },
    async modifierAuteur(root, {id, input}){
      console.log('ok')
      return await Auteur.findOneAndUpdate({id: id}, input, { new: true })
    },

    async verifLogin(root, { input }){

      const user = await Auteur.findOne({ login: input.login  })
      if (!user) {
        throw new Error('Identifiant inconnu')
      }
      const valid = await bcrypt.compare(input.password, user.password)

      if (!valid) {
        throw new Error('Mot de passe incorrect')
      }

      const loginToken = Object.assign({}, {
        token: await jsonwebtoken.sign(
          { id: user.id },
          settings,
          { expiresIn: '1d' }
        ),
        id: user.id
      })
      return loginToken
      
    },

    async supprimeAuteur(root, { id }){
      return await Auteur.findOneAndRemove({ id });
    },

    // * AMI MUTATION * //
    async demandeAmi(root, {id, utilisateurId}){
      if (id === utilisateurId) throw new Error (`Même utilisateur`)
      await Auteur.findOneAndUpdate(
        {id:id, 'demandesEnvoyees.id': { $ne: utilisateurId }},
        {$addToSet : 
          {demandesEnvoyees :  { id: utilisateurId }
          }
        }, {new:true});
      return await Auteur.findOneAndUpdate(
        {id:utilisateurId, 'demandesEnAttente.id': { $ne: id }},
        {$addToSet : 
          {demandesEnAttente :  { id: id }
          }
        }, {new:true});
    },
    async accepterAmi(root, {id, utilisateurId}){
      await Auteur.findOneAndUpdate(
        { id: utilisateurId },
        { $pull: { demandesEnvoyees: { id: id } } },
      );
      await Auteur.findOneAndUpdate(
        { id: id },
        { $pull: { demandesEnAttente: { id: utilisateurId } } },
      );
      await Auteur.findOneAndUpdate(
        {id:utilisateurId, 'amis.id': { $ne: id }},
        {$addToSet : 
          {amis :  { id: id }
          }
        }, {new:true});
      return await Auteur.findOneAndUpdate(
        {id:id, 'amis.id': { $ne: utilisateurId }},
        {$addToSet : 
          {amis :  { id: utilisateurId }
          }
        }, {new:true});
    },

    // * ARTICLES MUTATION * //
    async creerArticle(root, { input }) {
      const message = {
        texte: input.texte,
        auteurId: input.auteurId,
        id: await shortid.generate(),
        creationDate: await moment().toISOString()
      }
      await Article.create(message);
      console.log(message)
      pubsub.publish('articleAjoute', { articleAjoute: message })
      return message
    },

    async creerCommentaire(root, { input }, context) {
      const message = {
        texte: input.texte,
        articleId: input.articleId,
        id: shortid.generate(),
        auteurId: input.auteurId,
        creationDate: moment().toISOString()
      }
      await Commentaire.create(message);
      pubsub.publish('commentaireAjoute', { commentaireAjoute: message })
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
    commentaireAjoute: {
      subscribe: () => pubsub.asyncIterator('commentaireAjoute')
    },
  },
  // 
  Article: {
    async commentaires(article) {
      return await Commentaire.find({articleId: article.id});
    },
    async auteur(article) {
      return await Auteur.findOne({id: article.auteurId});
    }
  },
  Commentaire: {
    async auteurCom(com) {
      return await Auteur.findOne({id: com.auteurId});
    }
  },
  iDDemandes: {
    async personne(demande) {
      return await Auteur.findOne({id: demande.id});
    }
  }
  
};



export default resolvers;