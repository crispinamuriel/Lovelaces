/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')

const db = require('../../db')
const app = require('../../index')

const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    beforeEach(() => {
      return Order.create({
        address: 'Melody Lane',
        status: 'Received',
        total: 10
      })
    })

    it('GET /api/orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body).to.be.an('array')
    })
  }) // end describe('/api/orders')
}) // end describe('Order routes')
