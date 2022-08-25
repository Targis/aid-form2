import React, { Component } from 'react'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({})

export class Success extends Component {
  first = (e) => {
    setTimeout(() => {
      this.props.firstStep()
    }, 1000)
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppBar style={{ background: '#77E976' }} position="sticky">
          <Toolbar title="Enter Personal Information">
            <Typography color="inherit" variant="title">
              Confirm Details
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        <Typography variant="title">Thank you for your submission!</Typography>
        <br />
        <Typography>You will get an email with further instructions</Typography>
        <Button
          style={{ background: '#2E3B55', color: '#FFFFFF' }}
          onClick={this.first}
        >
          To First
        </Button>
      </ThemeProvider>
    )
  }
}

export default Success
