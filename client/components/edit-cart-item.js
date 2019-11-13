import React, {Component, Fragment} from 'react'
import {
  Dialog,
  DialogTitle,
  Button,
  Typography,
  DialogContent,
  DialogContentText,
  InputLabel,
  TextField
} from '@material-ui/core'
import {connect} from 'react-redux'
import {updateQuantityInCart} from '../store/order'

const style = {
  media: {objectFit: 'contain', width: 325, marginLeft: 20, marginRight: 20},
  inputLabel: {fontSize: '.75rem', margin: 0},
  input: {minWidth: 120, maxWidth: 120},
  modal: {padding: 10}
}

class EditCartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      quantity: this.props.quantity
    }
    this.handleOpenClose = this.handleOpenClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOpenClose = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    await this.props.updateCart(
      Number(this.state.quantity),
      this.props.orderId,
      this.props.shoe.id
    )

    this.setState({
      open: false
    })
  }

  render() {
    console.log(this.state)
    const {shoe: {imageUrl, name}, quantity} = this.props

    const max = quantity >= 10 ? quantity : 10

    return (
      <Fragment>
        <Button
          onClick={this.handleOpenClose}
          className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButtonGroup-grouped MuiButtonGroup-groupedText MuiButtonGroup-groupedText MuiButton-textSizeSmall MuiButton-sizeSmall"
        >
          Edit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleOpenClose}
          aria-labelledby="form-dialog-title"
          style={style.modal}
        >
          <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
          <DialogContent>
            <DialogContentText>{name}</DialogContentText>
            <img src={imageUrl} style={style.media} />
            <InputLabel id="quantity" style={style.inputLabel}>
              Quantity
            </InputLabel>
            <form onSubmit={this.handleSubmit}>
              <TextField
                value={this.state.quantity}
                onChange={this.handleChange}
                name="quantity"
                type="number"
                inputProps={{
                  min: 1,
                  max: max,
                  step: 1
                }}
                style={style.input}
              />
              <div style={{marginTop: 10}}>
                <Button variant="contained" color="primary" type="submit">
                  Update Cart
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

const mapDispatch = dispatch => ({
  updateCart: (quantity, orderId, shoeId) =>
    dispatch(updateQuantityInCart(quantity, orderId, shoeId))
})

export default connect(null, mapDispatch)(EditCartItem)
