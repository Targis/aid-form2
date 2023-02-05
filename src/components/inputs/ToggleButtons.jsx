import * as React from 'react';
import { Typography, InputLabel, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useField } from 'formik'

const options = [
  {
    label: 'Так',
    value: 1
  },
  {
    label: 'Ні',
    value: 0
  }
]

export default function ToggleButtons({ name, label, helperText, changeFormState, ...props }) {
  const [field, meta, helpers] = useField(name)

  const handleToggle = (event, newValue) => {
    if (newValue !== null) {
      console.log(newValue)
      helpers.setTouched(true)
      helpers.setValue(newValue)
    }

  };

  return (
    // <FormControl error={meta.touched && Boolean(meta.error)} sx={{ mb: 2 }} fullWidth>

    <Grid sx={{ my: 2 }}>
      <Grid sx={{}}>
        <Typography sx={{ flex: '1 1 auto' }}>{label}</Typography>
        <ToggleButtonGroup
          color={meta.value ? 'success' : 'error'}
          value={meta.value}
          exclusive
          onChange={handleToggle}
          aria-label="text alignment"
          sx={{ flex: '1 1 auto', my: 2 }}
        >
          <ToggleButton value={true} aria-label="left aligned" sx={{ minWidth: '100px' }} >
            Так
          </ToggleButton>
          <ToggleButton value={false} aria-label="right aligned" sx={{ minWidth: '100px' }} >
            Ні
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <FormHelperText sx={{ textAlign: 'center' }} error={true} >{(meta.touched && meta.error) || ' '}</FormHelperText>
    </Grid>
    // </FormControl>
  );
}