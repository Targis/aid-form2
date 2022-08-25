import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const Confirm = ({
  nextStep,
  prevStep,
  values: { firstName, lastName, email, occupation, city, bio },
}) => {
  const next = (e) => {
    e.preventDefault()
    console.log({ firstName, lastName, email, occupation, city, bio })
    nextStep()
  }
  const back = (e) => {
    e.preventDefault()
    prevStep()
  }

  return (
    <>
      <AppBar style={{ background: '#098F8F' }} position="sticky">
        <Toolbar title="Enter Personal Information">
          <Typography color="inherit" variant="title">
            Confirm Details
          </Typography>
        </Toolbar>
      </AppBar>

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Confirm your info
          </ListSubheader>
        }
      >
        <ListItem>
          <ListItemText primary="First Name" secondary={firstName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Last Name" secondary={lastName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary={email} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Occupation" secondary={occupation} />
        </ListItem>
        <ListItem>
          <ListItemText primary="City" secondary={city} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Bio" secondary={bio} />
        </ListItem>
      </List>

      <br />

      <br />
      <Button
        style={{
          background: '#EE3B55',
          color: '#FFFFFF',
          marginRight: '1em',
        }}
        label="Continue"
        onClick={(e) => back(e)}
      >
        Back
      </Button>
      <Button
        style={{
          background: '#3C61B8',
          color: '#FFFFFF',
          marginRight: '1em',
        }}
        label="Continue"
        onClick={(e) => next(e)}
      >
        Confirm and Continue
      </Button>
    </>
  )
}

export default Confirm
