import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getShoes} from '../store/shoe'

class Shoes extends Component {
  componentDidMount() {
    this.props.getShoes(this.props.categoryId)
  }

  render() {
    return (
      <div>
        {this.props.shoes.map(shoe => (
          <div key={shoe.id}>
            <h3>{shoe.name}</h3>
            <h4>{shoe.price}</h4>
            <img height="300" src={shoe.imageUrl} />
            <p>{shoe.description}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapAll = state => ({
  shoes: state.shoe.all,
  categoryId: 0
})

const mapSneakers = state => ({
  shoes: state.shoe.all,
  categoryId: 1
})

const mapBoots = state => ({
  shoes: state.shoe.all,
  categoryId: 2
})

const mapFlipFlops = state => ({
  shoes: state.shoe.all,
  categoryId: 3
})

const mapHeels = state => ({
  shoes: state.shoe.all,
  categoryId: 4
})

const mapFlats = state => ({
  shoes: state.shoe.all,
  categoryId: 5
})

const mapDispatch = dispatch => ({
  getShoes: categoryId => dispatch(getShoes(categoryId))
})

export const AllShoes = connect(mapAll, mapDispatch)(Shoes)
export const AllSneakers = connect(mapSneakers, mapDispatch)(Shoes)
export const AllBoots = connect(mapBoots, mapDispatch)(Shoes)
export const AllFlipFlops = connect(mapFlipFlops, mapDispatch)(Shoes)
export const AllHeels = connect(mapHeels, mapDispatch)(Shoes)
export const AllFlats = connect(mapFlats, mapDispatch)(Shoes)
