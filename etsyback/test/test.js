import assert from 'assert';
import request from 'supertest';
import router from '../controllers/index';
// const app = rerquire('./../controllers/index');

// describe('Array', function () {
//     describe('#indexOf()', function () {
//         it('should return -1 when the value is not present', function () {
//             assert.equal([1, 2, 3].indexOf(4), -1);
//         });
//     });
// });

describe('POST /shop/name/', () => {
    it('it checks if shop name is taken', (done) => {
        request(router)
            .post('/shop/name/')
            .send({ name: 'quirkbox' })
            .expect(200, done);
    });
});