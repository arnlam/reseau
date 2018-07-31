const { gql } = require('apollo-server-express');
import resolvers from './resolvers';
import { makeExecutableSchema } from 'graphql-tools'


const typeDefs = gql`
scalar Date
type Auteur {
  id: String!
  login: String!
  prenom: String
  nom: String
  email: String
  ville: String
  password: String
  avatar: String
  articles: [Article]
  creationDate: String
  amis: [iDDemandes],
  demandesEnAttente: [iDDemandes],
  demandesEnvoyees: [iDDemandes],
  chat: [CanalOpen]
}
type CanalOpen {
  id: String,
  canalId: String
}

type Article {
  id: String!
  texte: String!
  vues: Int
  auteurId: String
  commentaires: [Commentaire]
  auteur: Auteur
  creationDate: String
  uri: String
  like: [Like]
}
type Commentaire {
  id: String!
  articleId: String!
  texte: String!
  auteurId: String
  creationDate: String
  auteurCom: Auteur
}
type Token {
  token: String
  id: String
}

type iDDemandes{
  id: String!
  personne: Auteur
}

type Contact {
  id: String
  utilisateurId: String
}
type Canal {
  canalId: String
  messages: [Message]
}
# MESSAGE PRIVE

type Message {
  id: String
  userId: String
  texte: String
  creationDate: String
}
type Like {
  id: String
}

# //// INPUT ////

input InputAuteur {
  login: String
  prenom: String
  nom: String
  email: String
  ville: String
  password: String
}

input InputArticle {
  texte: String!
  auteurId: String
  uri: String
}
input InputCommentaire {
  texte: String!
  articleId: String!
  auteurId: String
}
input InputLogin {
  login: String!
  password: String!
}

input InputMessage {
  userId: String
  texte: String
}


# //// QUERY ////

type Query {
  auteur(id: String!): Auteur
  tousLesAuteurs: [Auteur]
  article(id: String!): Article
  tousLesArticles(first:Int): [Article]
  commentaires(articleId:String!): [Commentaire]
  auteurCom(auteurId:String!): Auteur
  personne(id: String!): Auteur
  tousLesMessagesChat(canalId: String!): [Message]
}

# //// MUTATION ////

type Mutation {
  # /// MUTATION USER ///
  creerAuteur(input: InputAuteur) : Auteur
  modifierAuteur(id:String!, input: InputAuteur) : Auteur
  supprimeAuteur(id:String!) : Auteur
  verifLogin(input: InputLogin) : Token
  demandeAmi(id: String!, utilisateurId: String!) : Contact
  accepterAmi(id: String!, utilisateurId: String!) : Contact
  refuserAmi(id: String!, utilisateurId: String!) : Contact
  # LIKE
  like(id: String!, articleId: String!) : Like

  # CHAT
  demandeChat(id: String!, utilisateurId: String!) : Canal
  creerMessage(input: InputMessage, canalId: String): Message

  # MUTATION ARTICLE
  creerArticle(input: InputArticle) : Article
  modifierArticle(id:String!, input: InputArticle) : Article
  supprimeArticle(id:String!) : Article
  
  # MUTATION COMMENTAIRE
  creerCommentaire(input:InputCommentaire) : Commentaire

  # MUTATION VUE
  ajoutVue(articleId:String!): Article


}

# //// SOUSCRIPTIONS ////
type Subscription {
  articleAjoute: Article
  commentaireAjoute: Commentaire
  messageChatAjoute(canalId: String): Message
}



`;

// const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });
const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default jsSchema;