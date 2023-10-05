import * as React from 'react';
import { Typography, FormHelperText, Grid, Box } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useField } from 'formik'

// eslint-disable-next-line
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
  // eslint-disable-next-line
  const [field, meta, helpers] = useField(name)

  const handleToggle = (event, newValue) => {
    if (newValue !== null) {
      console.log(newValue)
      helpers.setTouched(true)
      helpers.setValue(newValue)
    }

  };

  return (

    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ mr: 2 }}>{label}</Typography>
        <ToggleButtonGroup
          color={meta.value ? 'success' : 'error'}
          value={meta.value}
          exclusive
          onChange={handleToggle}
          aria-label="text alignment"
          // sx={{ flex: '1 1 auto', my: 2 }}
          size='small'
        >
          <ToggleButton value={true} aria-label="left aligned" sx={{ minWidth: '50px' }} >
            Так
          </ToggleButton>
          <ToggleButton value={false} aria-label="right aligned" sx={{ minWidth: '50px' }} >
            Ні
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <FormHelperText sx={{ textAlign: 'center' }} error={true} >{(meta.touched && meta.error) || ' '}</FormHelperText>
    </>

  );
}