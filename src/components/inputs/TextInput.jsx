import { TextField } from '@mui/material'
import { useField } from 'formik'

export const TextInput = ({ ...props }) => {
  const [field, meta, helpers] = useField(props.name)
  const sx = props?.sx || null

  return (
    <TextField
      {...field}
      {...props}
      id={'input-' + props.name}
      sx={sx ? { sx } : { mb: 2 }}
      variant="outlined"
      error={meta.touched && Boolean(meta.error)}
      helperText={props.helperText || (meta.touched && meta.error) || ' '}
      fullWidth
    />
  )
}

export default TextInput
