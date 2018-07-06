const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auteur {
  _id: ID!
  prenom: String
  nom: String
  articles: [Article]
}

type Article{
  _id: ID!
  texte: String
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
  auteur(_id:ID!): Auteur
  tousLesAuteurs: [Auteur]
  article(_id:ID!): Article
  tousLesArticles: [Article]
}

# //// MUTATION ////

type Mutation {
  creerAuteur(input: InputAuteur) : Auteur
  updateAuteur(_id: ID!, input: InputAuteur) : Auteur
  supprimeAuteur(_id: ID!) : Auteur

  # MUTATION ARTICLE
  creerArticle(input: InputArticle) : Article
  updateArticle(_id: ID!, input: InputArticle) : Article
  supprimeArticle(_id: ID!) : Article

  # MUTATION VUE
  ajoutVue(articleId:ID!): Article
}
`;

// const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default typeDefs;