import { IMaskInput } from 'react-imask'
import { forwardRef, useState } from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  OutlinedInput,
} from '@mui/material'
// import PropTypes from 'prop-types'

import { useField } from 'formik'

import NumberFormat from 'react-number-format'

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { handleBlur, onChange, handleChange, mask, format, ...other } = props

  return (
    <NumberFormat
      {...other}
      mask={mask}
      format={format}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
    />
  )
})

export const MaskedTextField = ({ format, mask, ...props }) => {
  const [field, meta] = useField(props.name)
  // const { values, handleChange } = props.formik
  const { name } = props

  return (
    <>
      <TextField
        {...field}
        {...props}
        name={name}
        id={'masket-input-' + props.name}
        // label={label}

        // value={formik.values[name]}
        // onChange={formik.handleChange}
        InputProps={{
          inputComponent: NumberFormatCustom,
          inputProps: {
            format,
            mask,
          },
        }}
        sx={{ mb: 3 }}
        variant="outlined"
        error={meta.touched && Boolean(meta.error)}
        helperText={(meta.touched && meta.error) || ' '}
        fullWidth
      />
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  )
}

export default MaskedTextField

// ----------------------------------------------------

// const InputTextMask = forwardRef(function InputTextMask(props, ref) {
//   const { onChange, ...other } = props
//   return (
//     <IMaskInput
//       {...other}
//       mask={props.mask}
//       // definitions={{
//       //   '#': /[1-9]/,
//       // }}
//       inputRef={ref}
//       onAccept={(value) => onChange({ target: { name: props.name, value } })}
//       // overwrite
//     />
//   )
// })

// // InputTextMask.propTypes = {
// //   name: PropTypes.string.isRequired,
// //   mask: PropTypes.string.isRequired,
// //   onChange: PropTypes.func.isRequired,
// // }

// export const FormControlMask = (props) => {
//   const {

//     name,
//     label,
//     mask,
//   } = props
//   return (
//     <FormControl sx={{ mb: 4 }} fullWidth variant="outlined">
//       <InputLabel htmlFor={'input-' + name} variant="outlined">
//         {label}
//       </InputLabel>
//       <Input
//         id={'input-' + name}
//         aria-describedby={'helper-text-' + name}
//         inputComponent={InputTextMask}
//         name={name}
//         // value={formik.values[name]}
//         // onChange={formik.handleChange}
//         // onBlur={formik.handleBlur}
//         inputProps={{
//           mask,
//           'aria-label': 'description',
//           // placeholderChar: '_',
//           // lazy: false,
//         }}
//       />

//       <FormHelperText
//         id={'helper-text-' + name}
//         error={meta.touched[name] && Boolean(errors[name])}
//       >
//         {touched[name] && errors[name]}
//       </FormHelperText>
//     </FormControl>
//   )
// }

// export default FormControlMask
