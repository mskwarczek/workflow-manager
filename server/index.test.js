const mongoose = require('mongoose');
const supertest = require('supertest');

const server = require('./index');
const User = require ('./schema/User');
const DATABASEURL = require('./config/dburl.json');

let request = supertest.agent(server);

const mockUserRegister = {
  firstName: 'Chuck',
  lastName: 'Norris',
  email: 'chuck@norris.com',
  password: 'roundhousekick',
};

const mockUserLogin = {
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

afterAll(async () => {
  await removeAllCollections();
});

describe('user register and log in', () => {

  it('registers new user', done => {
    request
      .post('/api/user/register')
      .send(mockUserRegister)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  it('saves user to database after registration', async done => {
    const user = await User.findOne({ email: 'chuck@norris.com' });
    expect(user.email).toBeTruthy();
    done();
  });

  it('signs in new user', done => {
    request
      .post('/api/user/signin')
      .send(mockUserLogin)
      .set('Accept', 'application/json')
      .expect(303)
      .expect('Location', '/api/user')
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  it('sends back user data', done => {
    request
      .get('/api/user')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.email).toBe('chuck@norris.com');
        done();
      });
  });
});
