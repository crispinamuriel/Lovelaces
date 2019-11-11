/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Homepage} from './homepage'
export {
  AllShoes,
  AllSneakers,
  AllBoots,
  AllHeels,
  AllFlipFlops,
  AllFlats
} from './shoes'
export {default as ErrorPage} from './errorpage'
export {default as Checkout} from './checkout'
export {default as Shoe} from './shoe'
export {default as Cart} from './cart'
export {default as Success} from './success'
export {default as UserProfile} from './user-profile'
export {default as UserOrders} from './user-orders'
