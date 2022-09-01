import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import FormHelperText from '@mui/material/FormHelperText'
import { useField } from 'formik'

export default function SelectInput({ ...props }) {
  const { name, label, options } = props
  const [field, meta] = useField(name)

  return (
    <FormControl sx={{ mb: 2, textAlign: 'left' }} fullWidth>
      <InputLabel id={'simple-select-label-' + name}>{label}</InputLabel>
      <Select
        {...field}
        {...props}
        labelId={'simple-select-label-' + name}
        id={'simple-select' + name}
        name={name}
        value={meta.value}
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{(meta.touched && meta.error) || ' '}</FormHelperText>
    </FormControl>
  )
}
