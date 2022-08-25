import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'
import PropTypes from 'prop-types'

export const InputTextMask = forwardRef(function InputTextMask(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask={props.mask}
      // definitions={{
      //   '#': /[1-9]/,
      // }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

InputTextMask.propTypes = {
  name: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default InputTextMask
