import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getShoes} from '../store/shoe'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getShoes()
  }

  render() {
    return (
      <div>
        {this.props.shoes.map(shoe => (
          <div key={shoe.id}>
            <h3>{shoe.name}</h3>
            <h4>{shoe.price}</h4>
            <img src={shoe.imageUrl} />
            <p>{shoe.description}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  shoes: state.shoe.all
})

const mapDispatch = dispatch => ({
  getShoes: () => dispatch(getShoes())
})

export default connect(mapState, mapDispatch)(AllProducts)
