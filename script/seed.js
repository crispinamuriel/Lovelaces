'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const heels = await Promise.all([
    Shoe.create({
      name: 'Schutz Chayanne',
      category: 4,
      imageUrl: 'https://www.zappos.com/i/9249384/color/821436/style/4765882/0',
      description: 'Color: Holographic Mirror, Leather, The high-heel sandal is constructed from a mirrored leather upper with a crossed multi-strap design at the vamp that takes your look from day to night.', price: 157
    }),
    Shoe.create({
      name:'Anne Klein Fabulist', category: 4, imageUrl: 'https://www.zappos.com/i/8455110/color/210694/style/4805211/0', description: 'Anne Klein™ iFlex Technology allows for a flexible fit that can bend up to 90 degrees. Be fabulous - be you, in the Fabulist heel by Anne Klein!', price: 80
    }),
    Shoe.create({
      name: 'See by Chloe SB33074A', category: 4, imageUrl: 'zappos.com/i/9301643/color/20/style/4868513/0', description: 'With a throwback to the 1970s leather See by Chloe™ platforms with woven eyelet details are sure to be a hit! Slingback style ankle strap with adjustable buckle closure.', price: 135
    }),
    Shoe.create({
      name: 'SJP by Sarah Jessica Parker Fawn 100mm', category: 4, imageUrl: 'https://www.zappos.com/i/8497292/color/3525/style/3175899/0', description: 'SJP Womens Footwear Size Chart. The classic pump is the cornerstone of a fabulous wardrobe. These timeless beauties belong in your closet! Leather or satin upper with grosgrain trim at the heel.', price: 170
    }),
    Shoe.create({
      name: 'Alexandre Birman Malica', category: 4, imageUrl: 'https://www.zappos.com/i/9242572/color/3/style/4751065/0', description: 'Pair your knockout style wearing the Alexandre Birman™ Malica 60 Leather upper.Adjustable buckle halo ankle strap.Open toe silhouette.', price: 200
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
