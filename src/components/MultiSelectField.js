// // import CloseIcon from '@mui/icons-material/Cancel'
// // import { Control, Controller, FieldError, Path } from 'react-hook-form'
// import { useField } from 'formik'
// import {
//   Checkbox,
//   Chip,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   ListItemText,
//   MenuItem,
//   Select,
// } from '@mui/material'

// const ITEM_HEIGHT = 48
// const ITEM_PADDING_TOP = 8

// const CloseIcon = () => <span>X</span>

// export default function MultiSelectElement({
//   options = [
//     'Oliver Hansen',
//     'Van Henry',
//     'April Tucker',
//     'Ralph Hubbard',
//     'Omar Alexander',
//     'Carlos Abbott',
//     'Miriam Wagner',
//     'Bradley Wilkerson',
//     'Virginia Andrews',
//     'Kelly Snyder',
//   ],
//   label = '',
//   itemKey = 'id',
//   itemValue = '',
//   itemLabel = 'label',
//   required = false,
//   validation = {},
//   parseError,
//   name,
//   menuMaxHeight = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//   menuMaxWidth = 250,
//   minWidth = 120,
//   helperText,
//   showChips,
//   control,
//   showCheckbox,
//   formControlProps,
//   ...rest
// }) {
//   if (required && !validation.required) {
//     validation.required = 'This field is required'
//   }

//   const [field, meta] = useField(name)

//   return (
//     // <Controller
//     //   name={name}
//     //   rules={validation}
//     //   control={control}
//     //   render={({
//     //     field: { value, onChange, onBlur },
//     //     fieldState: { invalid, error },
//     //   }) => {
//     //     helperText = error
//     //       ? typeof parseError === 'function'
//     //         ? parseError(error)
//     //         : error.message
//     //       : helperText
//     //     return (
//     //       <FormControl
//     //         {...formControlProps}
//     //         style={{
//     //           ...formControlProps?.style,
//     //           minWidth,
//     //         }}
//     //         variant={rest.variant}
//     //         fullWidth={rest.fullWidth}
//     //         error={invalid}
//     //       >
//     //         {label && (
//     //           <InputLabel
//     //             error={invalid}
//     //             htmlFor={rest.id || `select-multi-select-${name}`}
//     //             required={required}
//     //           >
//     //             {label}
//     //           </InputLabel>
//     //         )}
//     <Select
//       {...field}
//       {...rest}
//       id={rest.id || `select-multi-select-${name}`}
//       multiple
//       label={label || undefined}
//       // error={invalid}
//       // value={value || []}
//       // required={required}
//       // onChange={onChange}
//       // onBlur={onBlur}
//       MenuProps={{
//         ...rest.MenuProps,
//         PaperProps: {
//           ...(rest.MenuProps?.PaperProps ?? {
//             style: {
//               maxHeight: menuMaxHeight,
//               width: menuMaxWidth,
//               ...rest.MenuProps?.PaperProps?.style,
//             },
//           }),
//         },
//       }}
//       renderValue={
//         typeof rest.renderValue === 'function'
//           ? rest.renderValue
//           : showChips
//           ? (selected) => (
//               <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                 {selected.map((selectedValue) => (
//                   <Chip
//                     key={selectedValue}
//                     label={selectedValue}
//                     style={{ display: 'flex', flexWrap: 'wrap' }}
//                     onDelete={() => {
//                       rest.onChange(
//                         meta.value.filter((i) => i !== selectedValue)
//                       )
//                       // setValue(name, formValue.filter((i: any) => i !== value), { shouldValidate: true })
//                     }}
//                     deleteIcon={
//                       <CloseIcon
//                         onMouseDown={(ev) => {
//                           ev.stopPropagation()
//                         }}
//                       />
//                     }
//                   />
//                 ))}
//               </div>
//             )
//           : (selected) => (Array.isArray(selected) ? selected.join(', ') : '')
//       }
//     >
//       {options.map((item) => {
//         const val = item[itemValue || itemKey] || item
//         const isChecked = Array.isArray(meta.value)
//           ? meta.value.includes(val)
//           : false
//         return (
//           <MenuItem
//             key={val}
//             value={val}
//             sx={{
//               fontWeight: (theme) =>
//                 isChecked
//                   ? theme.typography.fontWeightBold
//                   : theme.typography.fontWeightRegular,
//             }}
//           >
//             {showCheckbox && <Checkbox checked={isChecked} />}
//             <ListItemText primary={item[itemLabel] || item} />
//           </MenuItem>
//         )
//       })}
//     </Select>
//     // {helperText && <FormHelperText>{helperText}</FormHelperText>}
//     // </FormControl>
//     //     )
//     //   }}
//     // />
//   )
// }

import { useField } from 'formik'

import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { FormHelperText } from '@mui/material'

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
  const [field, meta] = useField(props.name)
  const theme = useTheme()
  const [personName, setPersonName] = React.useState([])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
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
          value={meta.value}
          // onChange={handleChange}
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
          {/* {console.log(meta)} */}
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
