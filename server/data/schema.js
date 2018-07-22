const { gql } = require('apollo-server-express');
import resolvers from './resolvers';
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = gql`
type Auteur {
  id: String!
  login: String!
  prenom: String
  nom: String
  email: String
  ville: String
  password: String
  articles: [Article]
}

type Article {
  id: String!
  texte: String!
  vues: Int
  auteurId: String
  commentaires: [Commentaire]
  auteur: Auteur
}
type Commentaire {
  id: String!
  articleId: String!
  texte: String!
  auteurId: String
}
type Token {
  token: String
  id: String
}

# //// INPUT ////

input InputAuteur {
  login: String
  prenom: String!
  nom: String!
  email: String
  ville: String
  password: String
}

input InputArticle {
  texte: String!
  auteurId: String
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


# //// QUERY ////

type Query {
  auteur(id: String!): Auteur
  tousLesAuteurs: [Auteur]
  article(id: String!): Article
  tousLesArticles: [Article]
  commentaires(articleId:String!): [Commentaire]
}

# //// MUTATION ////

type Mutation {
  # /// MUTATION USER ///
  creerAuteur(input: InputAuteur) : Auteur
  modifierAuteur(id:String!, input: InputAuteur) : Auteur
  supprimeAuteur(id:String!) : Auteur
  verifLogin(input: InputLogin) : Token

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
  articleAjoute: Article!
}



`;

// const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });
const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default jsSchema;