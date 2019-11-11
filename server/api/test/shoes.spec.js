/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')

const db = require('../../db')
const app = require('../../index')

const Shoe = db.model('shoe')

describe('Shoe routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/shoes/', () => {
    beforeEach(() => {
      return Shoe.create({
        id: 1,
        name: 'Sans Samoa',
        category: 2,
        description: 'the best shoes ever',
        price: 100
      })
    })

    it('GET /api/shoes', async () => {
      const res = await request(app)
        .get('/api/shoes')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Sans Samoa')
    })

    it('GET `/api/shoes/:shoeId`', async () => {
      const res = await request(app)
        .get('/api/shoes/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.id).to.be.equal(1)
    })

    it('GET `/api/shoes/category/:id`', async () => {
      const res = await request(app)
        .get('/api/shoes/category/2')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].category).to.be.equal(2)
    })
  }) // end describe('/api/shoes')
}) // end describe('Shoe routes')
