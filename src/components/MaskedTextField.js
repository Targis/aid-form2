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
  const { value } = meta
  return (
    <PatternFormat
      {...props}
      name={name}
      label={label}
      format={format}
      mask={mask}
      value={formatResult ? value.replaceAll(/[.-]+/g, '') : value}
      // valueIsNumericString={true}
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

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const {
    onBlur,
    onChange,
    mask,
    format,
    type,
    isAllowed,
    value,
    setValue,
    formatResult,
    ...other
  } = props

  return (
    <PatternFormat
      {...other}
      name={props.name}
      mask={mask}
      format={format}
      type={type}
      isAllowed={isAllowed}
      // value={value}
      // allowEmptyFormatting={true}
      getInputRef={ref}
      onValueChange={(values) => {
        const val = formatResult ? values.formattedValue : values.value
        setValue(val)
      }}
    />
  )
})

export const MaskedTextField1 = ({
  format = undefined,
  mask = '_',
  type = 'text',
  name,
  valueIsNumericString = false,
  isAllowed = undefined,
  formatResult,
  ...props
}) => {
  const [field, meta, helpers] = useField(name)

  const { setValue } = helpers
  console.log(field)
  return (
    <>
      <TextField
        {...field}
        {...props}
        name={name}
        id={'masket-input-' + props.name}
        InputProps={{
          inputComponent: NumberFormatCustom,
          inputProps: {
            valueIsNumericString,
            format,
            mask,
            type,
            isAllowed,
            setValue,
            formatResult,
            value: meta.value,
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
