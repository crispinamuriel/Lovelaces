/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')

const db = require('../../db')
const app = require('../../index')

const User = db.model('user')

describe('User routes', () => {
  before(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const codyFirstName = 'Cody'
    const codyLastName = 'daPug'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        firstName: codyFirstName,
        lastName: codyLastName
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
