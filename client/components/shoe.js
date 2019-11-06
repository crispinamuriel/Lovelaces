import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCurrentShoe} from '../store/shoe'

class Shoe extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCurrentShoe(this.props.match.params.shoeId)
  }

  render() {
    console.log(this.props.current)

    return (
      <div id="shoeFullPage">
        <h1>{this.props.current.name}</h1>
        <p>Product description:{this.props.current.description}</p>
        <p>Shoe type:{this.props.current.category}</p>
        <p>Price: {this.props.current.price} </p>
        <div className="dropdown">
          <button className="dropbtn">Quantity: </button>
          <div className="quantity-dropdown">
            <a>1</a>
            <a>2</a>
            <a>3</a>
          </div>
        </div>

        <img src={this.props.current.imageUrl} />
      </div>
    )
  }
}
// quantity
// size

const mapStateToProps = state => {
  return {
    current: state.shoe.current
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentShoe: function(id) {
      return dispatch(getCurrentShoe(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shoe)

//
