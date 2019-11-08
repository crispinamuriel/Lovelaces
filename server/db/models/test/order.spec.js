// /* global describe beforeEach it */

// const {expect} = require('chai')
// const db = require('../../db')
// const Order = db.model('order')

// describe('Order model', () => {
//   before(() => {
//     return db.sync({force: true})
//   })

//   let newCart
//   beforeEach(() => {
//     newCart = Order.build({
//       address: '42 Wallaby way',
//       status: 'Complete',
//       total: 100
//     })
//   })

//   afterEach(() => {
//     return Promise.all([Order.truncate({cascade: true})])
//   })

//   describe('attributes definition', () => {
//     it('includes `address`, `total` and `status` fields', async () => {
//       const myOrder = await newCart.save()
//       expect(myOrder.address).to.equal('42 Wallaby way')
//       expect(myOrder.total).to.equal(100)
//       expect(myOrder.status).to.equal('Complete')
//     })
//   })
// }) // end describe('User model')
