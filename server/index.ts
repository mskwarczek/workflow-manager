import express, { NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import mongo from 'connect-mongo';

import DATABASEURL from './config/dburl.json';
import SECRETKEY from './config/secret_key.json';
import User from './schema/User';

const MongoStore = mongo(session);

const server = express();

mongoose.connect(DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch((error) => console.log('MongoDB connection error. Could not establish database connection. Please make sure MongoDB is running.', error));

mongoose.connection.on('error', (error) => {
  console.log('MongoDB connection error. Database connection has been broken. Please make sure MongoDB is running.', error);
});

server.use(bodyParser.json());

server.use(session({
  name: 'workflow_sid',
  resave: false,
  saveUninitialized: false,
  secret: SECRETKEY,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    sameSite: true,
    secure: false, // needs to be changed to true after receiving ssl certificate
    httpOnly: false,
  },
}));

server.use(express.static(path.join(__dirname, 'build')));

server.post('/api/user/register', (req, res, next) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    isVerified: false,
    organizations: [],
  });
  newUser.save((err, user) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) next(new Error('This email address is already taken. Try another one.'));
      else next(new Error('MongoDB error. Unable to save user data to database.'));
    };
    const responseData = JSON.stringify(user);
    return res.send(responseData);
  });
});

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

server.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
  res.status(500).send(err.message);
 });

// development only
const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server is listening on port ${port}`);

export default server;
