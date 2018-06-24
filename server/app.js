const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const apiRoutes = require('./routes/api');
const app = express();
const { graphqlExpress, graphiqlExpress } = require ('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const books = [
    {
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];
  const typeDefs = `
    type Query { books: [Book] }
    type Book { title: String, author: String }
  `;
  const resolvers = {
    Query: { books: () => books },
  };
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRoutes);

module.exports = app;
