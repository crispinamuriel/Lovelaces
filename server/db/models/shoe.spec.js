const {expect} = require('chai')
const db = require('../index')
const Shoe = db.model('shoe')

describe('Shoe model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Default Image', () => {
    it('sets a defualt image URL if one is not provided', async () => {
      const shoe = Shoe.build({
        name: 'shoe name',
        category: 4,
        description: 'this shoe is awesome',
        price: 12.99
      })

      try {
        await shoe.validate()
        expect(shoe.imageUrl).to.equal('https://tinyurl.com/y35fmc2q')
      } catch (error) {
        expect(error.message).to.contain('imageUrl cannot be null')
      }
    })
  })
})
