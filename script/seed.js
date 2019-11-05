'use strict'

const db = require('../server/db')
const {User, Shoe} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const shoes = await Promise.all([
    Shoe.create({
      name: 'Schutz Chayanne',
      category: 4,
      imageUrl: 'https://www.zappos.com/i/9249384/color/821436/style/4765882/0',
      description:
        'Color: Holographic Mirror, Leather, The high-heel sandal is constructed from a mirrored leather upper with a crossed multi-strap design at the vamp that takes your look from day to night.',
      price: 157
    }),
    Shoe.create({
      name: 'Anne Klein Fabulist',
      category: 4,
      imageUrl: 'https://www.zappos.com/i/8455110/color/210694/style/4805211/0',
      description:
        'Anne Klein™ iFlex Technology allows for a flexible fit that can bend up to 90 degrees. Be fabulous - be you, in the Fabulist heel by Anne Klein!',
      price: 80
    }),
    Shoe.create({
      name: 'See by Chloe SB33074A',
      category: 4,
      imageUrl: 'zappos.com/i/9301643/color/20/style/4868513/0',
      description:
        'With a throwback to the 1970s leather See by Chloe™ platforms with woven eyelet details are sure to be a hit! Slingback style ankle strap with adjustable buckle closure.',
      price: 135
    }),
    Shoe.create({
      name: 'SJP by Sarah Jessica Parker Fawn 100mm',
      category: 4,
      imageUrl: 'https://www.zappos.com/i/8497292/color/3525/style/3175899/0',
      description:
        'SJP Womens Footwear Size Chart. The classic pump is the cornerstone of a fabulous wardrobe. These timeless beauties belong in your closet! Leather or satin upper with grosgrain trim at the heel.',
      price: 170
    }),
    Shoe.create({
      name: 'Alexandre Birman Malica',
      category: 4,
      imageUrl: 'https://www.zappos.com/i/9242572/color/3/style/4751065/0',
      description:
        'Pair your knockout style wearing the Alexandre Birman™ Malica 60 Leather upper.Adjustable buckle halo ankle strap.Open toe silhouette.',
      price: 200
    }),
    Shoe.create({
      name: 'Major Brass',
      category: 2,
      imageUrl:
        'https://cdnc.lystit.com/1200/630/tr/photos/2012/01/05/lucky-brand-sequoia-joss-lace-ankle-booties-product-1-2657649-088221167.jpeg',
      description:
        'Cognac leather booties with 3 inch block heels. Red laces, zippers on the inside',
      price: 199.99
    }),
    Shoe.create({
      name: 'Quick Sliver',
      category: 2,
      imageUrl:
        'https://images.bloomingdalesassets.com/is/image/BLM/products/2/optimized/10424312_fpx.tif?op_sharpen=1&wid=700&fit=fit,1&$filtersm$&fmt=webp',
      description:
        'Snakeskin embossed faux leather booties. Stiletto 2 inch heels',
      price: 94.99
    }),
    Shoe.create({
      name: 'Little Black Bootie',
      category: 2,
      imageUrl:
        'https://n.nordstrommedia.com/id/sr3/56a9abf9-1f8b-4eb0-b28a-996ce60241f0.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838&dpr=2',
      description:
        'Black sock booties. Textured rib-knit upper. 1.5 inch block heels',
      price: 39.99
    }),
    Shoe.create({
      name: 'Half-calf Americano',
      category: 2,
      imageUrl:
        'https://slimages.macysassets.com/is/image/MCY/products/2/optimized/15431142_fpx.tif?op_sharpen=1&wid=1230&hei=1500&fit=fit,1&$filterxlrg$',
      description:
        'Knee length boots with a faux-leather panel in front of the shin and a flexible neoprene panel around the calf. 2 inch sensible block heel',
      price: 149.99
    }),
    Shoe.create({
      name: 'Sorry Im Latte',
      category: 2,
      imageUrl:
        'https://slimages.macysassets.com/is/image/MCY/products/8/optimized/15653488_fpx.tif?op_sharpen=1&wid=1230&hei=1500&fit=fit,1&$filterxlrg$',
      description: 'White faux-leather ankle booties with carmel colored heels',
      price: 109.99
    }),
    Shoe.create({
      name: 'Ergonomic Flip-Flops',
      category: 3,
      imageUrl:
        'https://i8.amplience.net/i/fitflop/IQUSHION-ERGONOMIC-FLIP-FLOPS-MIDNIGHT-NAVY2_E54-399.webp?v=3&w=3072',
      description:
        'From the top, they look like your typical Surfer-girl flip flops. Throw a pair in your suitcase and you will find yourself wearing them to beach, bar and beyond!',
      price: 32.0
    }),
    Shoe.create({
      name: 'Cushion Bounce Stargazer',
      category: 3,
      imageUrl:
        'https://flipflopshops.com/pub/media/catalog/product/cache/9d08971813a040f8f96067a40f75c615/r/f/rf0a3fdn_fra_zoom.jpg',
      description:
        'There is no more wishing upon a star for a comfortable sandal with style.',
      price: 30.0
    }),
    Shoe.create({
      name: 'Blue Flip Flops',
      category: 3,
      imageUrl: 'https://m.media-amazon.com/images/I/71fNW5JNsOL._SX700_.jpg',
      description: 'Bring on the heat with these amazing flip flops!',
      price: 18.0
    }),
    Shoe.create({
      name: 'Wonder Woman Flip Flops',
      category: 3,
      imageUrl: 'https://m.media-amazon.com/images/I/81S9n7n2m3L._SX700_.jpg',
      description: 'Channel your inner superhero!',
      price: 26.99
    }),
    Shoe.create({
      name: 'Floral Flip Flops',
      category: 3,
      imageUrl: 'https://m.media-amazon.com/images/I/71-esimNqOL._SX700_.jpg',
      description: 'Walk on flowers with these bad boys.',
      price: 58.0
    }),

    Shoe.create({
      name: 'Ballet Slippers',
      category: 5,
      imageUrl: 'https://m.media-amazon.com/images/I/71EBPpFYInL._SX700_.jpg',
      description: 'Always makes you feel like dancing the night away',
      price: 41.3
    }),
    Shoe.create({
      name: 'Straight Up Flats',
      category: 5,
      imageUrl: 'https://m.media-amazon.com/images/I/71Lug7PRsrL._SX700_.jpg',
      description: 'Sophisticated, comfy, easy slip-on',
      price: 79.95
    }),
    Shoe.create({
      name: 'Tan Flats',
      category: 5,
      imageUrl: 'https://m.media-amazon.com/images/I/81+AIkifvaL._SX700_.jpg',
      description:
        'Keeping it chic with these flats. Point-toe, lightly cushioned.',
      price: 49.99
    }),
    Shoe.create({
      name: 'London Flats',
      category: 5,
      imageUrl: 'https://m.media-amazon.com/images/I/614mKkIlEFL._SX700_.jpg',
      description:
        "It's the perfect companion for your favorite jeans, a V-neck, and light cardigan.",
      price: 55.99
    }),
    Shoe.create({
      name: 'Softwalk',
      category: 5,
      imageUrl: 'https://m.media-amazon.com/images/I/81Eo4Hta8DL._SX700_.jpg',
      description: "These make you feel like you're walking on a cloud",
      price: 109.95
    }),
    Shoe.create({
      name: 'Vans Old Skool Pro',
      category: 1,
      imageUrl: 'https://m.media-amazon.com/images/I/71T1mXQC-uL.jpg',
      description: 'Pay homage to the styles that came before while looking to the future with the Vans® Old Skool Pro shoe! Features a classic silhouette updated for enhanced performance.',
      price: 64.95
    }),
     Shoe.create({
      name: 'Blowfish Play',
      category: 1,
      imageUrl: 'https://m.media-amazon.com/images/I/71O2oRuQeEL.jpg',
      description: 'Take your look old school with the distressed look of the Blowfish® Play slip-on sneaker! Pieced textile upper. Easy slip-on wear.',
      price: 39.99
    }),
     Shoe.create({
      name: 'Arcopedico LS',
      category: 1,
      imageUrl: 'https://m.media-amazon.com/images/I/81ZCwc+ayuL.jpg',
      description: 'Treat your feet to the Arcopedico® Vegan LS lace-up oxford. Features a knit upper for fashionable and long-lasting wear and lining contains the Sansmell™ deodorizing system which is antimicrobial.',
      price:
    }),
     Shoe.create({
      name: 'Converse Chuck Taylor® All Star® Frozen Collection',
      category: 1,
      imageUrl: 'https://m.media-amazon.com/images/I/718PeWZOfOL.jpg',
      description: 'Bring some magic to your kicks with the Converse® Chuck Taylor All Star Hi - Disneys Frozen sneakers.',
      price: 65
    }),
     Shoe.create({
      name: 'Billabong Marina',
      category: 1,
      imageUrl: 'https://m.media-amazon.com/images/I/71it3MQJTzL.jpg',
      description: 'Keep your chill with the stress-free style of the Billabong® Marina Sneaker!',
      price: 45.95
    }),
  ])

  console.log(`seeded ${users.length} users and ${shoes.length} shoes`)
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
