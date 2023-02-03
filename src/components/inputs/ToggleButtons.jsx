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

export default function ToggleButtons({ name, label, helperText, ...props }) {
  const [field, meta, helpers] = useField(name)

  const handleToggle = (event, newAlignment) => {
    if (newAlignment !== null) {
      console.log(newAlignment)
      helpers.setTouched(true)
      helpers.setValue(newAlignment)
    }

  };

  return (
    // <FormControl error={meta.touched && Boolean(meta.error)} sx={{ mb: 2 }} fullWidth>

    <Grid sx={{ textAlign: 'left', my: 4 }}>
      <Grid sx={{ display: 'flex' }}>
        <Typography sx={{ flex: '1 1 auto' }}>Ви проживаєте в Запоріжжі і можете особисто отримати одяг?</Typography>
        <ToggleButtonGroup
          color={meta.value ? 'primary' : 'error'}
          value={meta.value}
          exclusive
          onChange={handleToggle}
          aria-label="text alignment"
          sx={{ flex: '1 1 auto' }}
        >
          <ToggleButton value={true} aria-label="left aligned" sx={{ minWidth: 13 }} >
            Так
          </ToggleButton>
          <ToggleButton value={false} aria-label="right aligned" sx={{ minWidth: 13 }} >
            Ні
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <FormHelperText error={true} >{(meta.touched && meta.error) || ' '}</FormHelperText>
    </Grid>
    // </FormControl>
  );
}