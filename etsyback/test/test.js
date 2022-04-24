import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import casual from 'casual';
import server from '../server';

chai.use(chaiHttp);

describe('API testing', () => {
  let token;

  const email = casual.email;
  const password = casual.password;
  const name = casual.name;

  const address = {
    address1: '200 trinity drive',
    city: 'san fransisco',
    state: 'california',
    country: 'USA',
    zipcode: 91344,
  };

  let shopId;

  it('Checks Signup API and returns status code', (done) => {
    chai.request(server)
      .post('/api/signup')
      .send({
        name,
        email,
        password,
      })
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        done();
      });
  });

  it('Checks Login API and returns status code', (done) => {
    chai.request(server)
      .post('/api/login')
      .send({
        email,
        password,
      })
      .end((err, res) => {
        token = res.header['x-auth-token'];
        expect(res.statusCode).to.eq(200);
        done();
      });
  });

  it('Checks User Product Favorites API and returns status code', (done) => {
    chai.request(server)
      .get('/api/user/favorites')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        done();
      });
  });

  it('Checks Create Shop API and returns status code', (done) => {
    chai.request(server)
      .post('/api/shop/create')
      .field({
        name: casual.word,
        description: casual.description,
        address: JSON.stringify(address),
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        shopId = res.body.shop._id;
        expect(res.statusCode).to.eq(200);
        done();
      });
  });

  it('Checks Create Shop Products API and returns status code', (done) => {
    chai.request(server)
      .post('/api/shop/product/create')
      .field({
        shopId,
        name: casual.word,
        description: casual.description,
        isCustom: false,
        category: 'Art',
        price: 100,
        quantity: 10,
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        done();
      });
  });
});
