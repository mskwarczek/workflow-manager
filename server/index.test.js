const mongoose = require('mongoose');
const supertest = require('supertest');

const server = require('./index');
const DATABASEURL = require('./config/dburl.json');

const request = supertest(server);

const mockUserRegister = {
  firstName: 'Chuck',
  lastName: 'Norris',
  email: 'chuck@norris.com',
  password: 'roundhousekick',
};

const removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  };
};

beforeAll(async () => {
  await mongoose.connect(`${DATABASEURL}tests?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

afterEach(async () => {
  await removeAllCollections();
});

it('registers new user', done => {
  request
    .post('/api/user/register')
    .send(mockUserRegister)
    .set('Accept', 'application/json')
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.body.email).toBe('chuck@norris.com');
      done();
    });
});
