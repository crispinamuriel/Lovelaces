import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Grid,
  Paper,
  Toolbar,
  Typography,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent
} from '@material-ui/core'
import {updateUser} from '../store/user'

const style = {
  paper: {
    marginBottom: 20,
    marginTop: 20,
    maxWidth: 750,
    minWidth: 600,
    padding: 25
  },
  pageHeader: {flex: 1},
  form: {display: 'flex', flexDirection: 'column'},
  formField: {margin: 20},
  dialog: {padding: 20}
}

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      open: false
    }
    this.open = false
    this.handleToggle = this.handleToggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  handleChange = name => ({target: {value}}) => {
    this.setState({
      [name]: value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.updateUser({id: this.props.user.id, ...this.state})
    this.setState({open: true})
  }

  render() {
    const {firstName, lastName, email} = this.state

    return (
      <Grid container justify="center">
        <Paper style={style.paper} elevation={5}>
          <Toolbar>
            <Typography variant="h6" style={style.pageHeader}>
              Account Details
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.history.push('/home')
              }}
            >
              Back To Account Overview
            </Button>
          </Toolbar>
          <Divider variant="middle" />
          <form onSubmit={this.handleSubmit} style={style.form}>
            <TextField
              autoFocus
              required
              label="First Name"
              value={firstName}
              onChange={this.handleChange('firstName')}
              type="text"
              margin="dense"
              style={style.formField}
            />
            <TextField
              required
              label="Last Name"
              value={lastName}
              onChange={this.handleChange('lastName')}
              type="text"
              margin="dense"
              style={style.formField}
            />
            <TextField
              required
              label="Email Address"
              value={email}
              onChange={this.handleChange('email')}
              type="email"
              margin="dense"
              style={style.formField}
            />
            <Button type="submit" color="primary" variant="contained">
              Update Account
            </Button>
          </form>
          <Dialog
            onClose={this.handleToggle}
            open={this.state.open}
            style={style.dialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Success!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Your account information has been updated
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Paper>
      </Grid>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  updateUser: user => dispatch(updateUser(user))
})

export default connect(mapState, mapDispatch)(UserProfile)
