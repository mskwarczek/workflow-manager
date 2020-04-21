import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import mongo from 'connect-mongo';

import DATABASEURL from './config/dburl.json';
import SECRETKEY from './config/secret_key.json';

const MongoStore = mongo(session);

const server = express();

const handleError = (error: any, message: string) => {
 console.log(message);
 console.log(error);
};

mongoose.connect(DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch((error) => handleError(error, 'MongoDB connection error. Could not establish database connection. Please make sure MongoDB is running.'));

mongoose.connection.on('error', (error) => {
  handleError(error, 'MongoDB connection error. Database connection has been broken. Please make sure MongoDB is running.');
});

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

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// development only
const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server is listening on port ${port}`);

export default server;
