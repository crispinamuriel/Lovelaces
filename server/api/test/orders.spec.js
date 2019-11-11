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
        id: 2,
        address: 'Melody Lane',
        status: 'Received',
        total: 10,
        orderItems: [
          {
            quantity: 1,
            shoe: {
              id: 22,
              name: 'Vans Old Skool'
            }
          }
        ]
      })
    })

    it('GET /api/orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].address).to.be.equal('Melody Lane')
    })

    it('GET `/api/orders/user-orders/:userId`', async () => {
      const res = await request(app).get('/api/orders/user-orders/2')

      expect(res.body).to.be.an('array')
    })
  }) // end describe('/api/orders')
}) // end describe('Order routes')
