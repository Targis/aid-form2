import React from 'react'
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { useField } from 'formik'

const CheckField = ({ name, label, helperText, ...props }) => {
  const [field, meta] = useField(name)

  return (
    <FormControl error={meta.touched && Boolean(meta.error)} sx={{ mb: 1 }} fullWidth>

      <FormControlLabel
        control={
          <Checkbox
            {...props}
            {...field}
            name={name}
            id={'input-' + name}
            // sx={{ mb: 2 }}
            checked={meta.value ? true : false}
          />
        }
        label={label}
        sx={{ textAlign: "left" }}
      />

      <FormHelperText sx={{ ml: 4 }}>{(meta.touched && meta.error) || ' '}</FormHelperText>

    </FormControl>

  )
}

export default CheckField