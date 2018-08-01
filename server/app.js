import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import Mongoose from 'mongoose';

// import indexRouter from './routes/index';
import cors from 'cors';
import {onUpload, onDeleteFile } from './middleware/upload';




const app = express();
app.use(cors());

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost:27017/reseau', { useNewUrlParser: true });

// app.use('/api', bodyParser.json(), auth, graphqlExpress(req => ({
//   schema,
//   context: {
//     user: req.user
//   }
// }))
// )


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'))
})


// config app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

// routes
app.post("/uploads", onUpload);
app.delete("/uploads/:uuid", onDeleteFile);

// app.use('/', path.join(__dirname, '../front/public'))
// app.use('/', indexRouter);

// app.use('/api', apiRoutes);

module.exports = app;
