const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../../app');

describe('Test GET /users endpoint', () => {
  it('should return an array of users with a 200 status code', async () => {
    const res = await request(app).get('/users/');
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('_id');
    expect(res.body[0]).to.have.property('name');
    expect(res.body[0]).to.have.property('email');
    expect(res.body[0]).to.have.property('dateOfBirth');
    expect(res.body[0]).to.have.property('createdAt');
    expect(res.body[0]).to.have.property('updatedAt');
  });
});
