import TextField from '@mui/material/TextField'
import { PatternFormat } from 'react-number-format'

const PatternFormatedField = (props) => {

  return (
    <PatternFormat
      {...props}
      customInput={TextField}
      variant="outlined"
      fullWidth
    />
  )
}

export default PatternFormatedField