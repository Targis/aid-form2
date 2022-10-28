import { TextField } from '@mui/material'
import { useField } from 'formik'
import { PatternFormat } from 'react-number-format'

const MaskedTextField = ({
  name,
  label,
  format,
  mask,
  formatResult,
  ...props
}) => {
  const [field, meta, helpers] = useField(name)

  return (
    <PatternFormat
      // {...field}
      {...props}
      name={name}
      label={label}
      format={format}
      mask={mask}
      value={field.value}
      onValueChange={(values) => {
        const val = formatResult ? values.formattedValue : values.value
        helpers.setValue(val)
      }}
      customInput={TextField}
      sx={{ mb: 3 }}
      variant="outlined"
      error={meta.touched && Boolean(meta.error)}
      helperText={(meta.touched && meta.error) || ' '}
      fullWidth
    />
  )
}

export default MaskedTextField