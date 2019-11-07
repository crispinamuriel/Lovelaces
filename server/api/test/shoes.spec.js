/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Shoe = db.model('shoe')

describe('Shoe routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/shoes/', () => {
    beforeEach(() => {
      return Shoe.create({
        name: 'Sans Samoa'
      })
    })

    it('GET /api/shoes', async () => {
      const res = await request(app)
        .get('/api/shoes')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Sans Samoa')
    })
  }) // end describe('/api/shoes')
}) // end describe('Shoe routes')
