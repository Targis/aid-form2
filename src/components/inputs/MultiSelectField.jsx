
import { Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip, FormHelperText } from '@mui/material'
import { useField } from 'formik'
import { useTheme } from '@mui/material/styles'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export default function MultiSelectField({ ...props }) {
  const [field, meta, helpers] = useField(props.name)
  const theme = useTheme()

  const handleChange = (event) => {
    let {
      target: { value },
    } = event

    helpers.setValue(typeof value === 'string' ? value.split(',') : value)
  }

  const { name, options } = props

  return (
    <div>
      <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
        <InputLabel id={'multiple-chip-label-' + name}>
          {props.label}
        </InputLabel>
        <Select
          {...field}
          labelId={'multiple-chip-label-' + name}
          id={'multiple-chip-' + name}
          onChange={handleChange}
          input={
            <OutlinedInput
              id={'select-multiple-chip-' + name}
              label={props.label}
              multiple
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => {
            let isChecked = meta.value.includes(option)

            return (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  fontWeight: (theme) =>
                    isChecked
                      ? theme.typography.fontWeightBold
                      : theme.typography.fontWeightRegular,
                }}
              >
                {option}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>{(meta.touched && meta.error) || ' '}</FormHelperText>
      </FormControl>
    </div>
  )
}
