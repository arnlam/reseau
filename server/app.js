import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import Mongoose from 'mongoose';
import indexRouter from './routes/index';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import resolvers from './data/resolvers';
import typeDefs from './data/schema';

const app = express();
app.use(cors());

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost:27017/reseau', { useNewUrlParser: true });

const server = new ApolloServer({typeDefs, resolvers})
server.applyMiddleware({app});

// config app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
// app.use('/', path.join(__dirname, '../front/public'))
// app.use('/', indexRouter);

// app.use('/api', apiRoutes);

module.exports = app;
