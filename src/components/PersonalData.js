import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const PersonalData = ({ values, handleChange, nextStep, prevStep }) => {
  const next = (e) => {
    e.preventDefault()
    nextStep()
  }
  const back = (e) => {
    e.preventDefault()
    prevStep()
  }

  return (
    <>
      <AppBar style={{ background: '#333' }} position="sticky">
        <Toolbar title="Enter Personal Information">
          <Typography color="inherit" variant="title">
            Enter Personal Details
          </Typography>
        </Toolbar>
      </AppBar>
      <TextField
        label="Occupation"
        helperText="Enter Occupation"
        onChange={handleChange('occupation')}
        defaultValue={values.occupation}
      />
      <br />
      <TextField
        label="City"
        helperText="Enter City"
        onChange={handleChange('city')}
        defaultValue={values.city}
      />
      <br />
      <TextField
        label="Bio"
        helperText="Enter Your Bio"
        onChange={handleChange('bio')}
        defaultValue={values.bio}
      />
      <br />
      <br />
      <Button
        style={{
          background: '#EE3B55',
          color: '#FFFFFF',
          marginRight: '1em',
        }}
        label="Back"
        onClick={(e) => back(e)}
      >
        Back
      </Button>
      <Button
        style={{
          background: '#991A76',
          color: '#FFFFFF',
        }}
        label="Continue"
        onClick={(e) => next(e)}
      >
        {' '}
        Continue
      </Button>
    </>
  )
}

export default PersonalData
