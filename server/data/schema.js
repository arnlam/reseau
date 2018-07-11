const { gql } = require('apollo-server-express');
import resolvers from './resolvers';
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = gql`
type Auteur {
  id: String!
  prenom: String
  nom: String
  articles: [Article]
}

type Article{
  id: String !
  texte: String !
  vues: Int
  auteur: String
}

# //// INPUT ////

input InputAuteur {
  prenom: String!
  nom: String!
}

input InputArticle {
  texte: String!
  auteur: String
}

# //// QUERY ////

type Query {
  auteur(id: String!): Auteur
  tousLesAuteurs: [Auteur]
  article(id: String!): Article
  tousLesArticles: [Article]
}

# //// MUTATION ////

type Mutation {
  creerAuteur(input: InputAuteur) : Auteur
  updateAuteur(id:String!, input: InputAuteur) : Auteur
  supprimeAuteur(id:String!) : Auteur

  # MUTATION ARTICLE
  creerArticle(input: InputArticle) : Article
  updateArticle(id:String!, input: InputArticle) : Article
  supprimeArticle(id:String!) : Article

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