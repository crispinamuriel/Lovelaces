import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Divider,
  Button,
  Card,
  CardContent,
  Avatar
} from '@material-ui/core'
import {AccountCircle, LocalMall} from '@material-ui/icons'

/**
 * COMPONENT
 */

const style = {
  infoPanel: {
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 350,
    minWidth: 350
  },
  card: {maxWidth: 300},
  paper: {
    marginBottom: 20,
    marginTop: 20,
    maxWidth: 750,
    minWidth: 600,
    padding: 25
  },
  avatar: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 12,
    width: 60,
    height: 60
  },
  cardContainer: {marginTop: 20},
  cardHeader: {display: 'flex', alignItems: 'center'}
}

export const UserHome = () => {
  return (
    <Grid container justify="center">
      <Paper style={style.paper}>
        <Toolbar>
          <Typography variant="h6">Account Details</Typography>
        </Toolbar>
        <Divider variant="middle" />
        <Grid
          container
          spacing={4}
          justify="center"
          style={style.cardContainer}
        >
          <Grid item>
            <Card style={style.card}>
              <CardContent>
                <Link to="/profile">
                  <div style={style.cardHeader}>
                    <Avatar style={style.avatar}>
                      <AccountCircle />
                    </Avatar>
                    <Typography variant="h6">My Details</Typography>
                  </div>
                  <Typography variant="body1">
                    View or update your personal information
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card style={style.card}>
              <CardContent>
                <Link to="/orders">
                  <div style={style.cardHeader}>
                    <Avatar style={style.avatar}>
                      <LocalMall />
                    </Avatar>
                    <Typography variant="h6">My Orders</Typography>
                  </div>
                  <Typography variant="body1">
                    Check the status of your order or see past orders
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.firstName
  }
}

export default connect(mapState)(UserHome)
