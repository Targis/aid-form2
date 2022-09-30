import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import FormHelperText from '@mui/material/FormHelperText'
import TextInput from './TextInput'
import { useField } from 'formik'

export default function AutocompleteField({ ...props }) {
  const { name, label, options } = props
  // const [field, meta] = useField(name)
  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.id === value.id}
      disablePortal
      id={'combo-box-' + name}
      options={options}
      renderInput={(params) => (
        <TextInput
          // {...field}
          {...props}
          {...params}
          name={name}
          label={label}
          // helperText={(meta.touched && meta.error) || ' '}
        />
      )}
      sx={{ mb: 2 }}
      fullWidth
      // helperText={(meta.touched && meta.error) || ' '}
    />
  )
}
