import React, { useEffect } from 'react'
import { useFormikContext, useField } from 'formik'
import TextInput from 'components/inputs/TextInput'
import AutocompleteField from 'components/inputs/AutocompliteField'

const StreetField = ({ streets, name, label, ...props }) => {
  const { values: { address_city } } = useFormikContext()
  // eslint-disable-next-line
  const [field, meta, helpers] = useField(name)
  const { value } = meta

  const hasOptions = address_city === 'м.Оріхів'
  const isOption = streets.findIndex(item => item.label === value) > -1

  let newVal = ''

  if (hasOptions) {
    newVal = isOption ? value : ''
  } else {
    newVal = isOption ? '' : value
  }

  useEffect(() => {
    helpers.setValue(newVal)
  }, [address_city]) // eslint-disable-line


  return (
    <>
      {hasOptions ? (
        <AutocompleteField
          {...props}
          id={`input-${name}`}
          name={name}
          label={label}
          options={streets}
        />
      )

        : (
          <TextInput
            {...props}
            id={`input-${name}`}
            name={name}
            label={!address_city ? 'Оберіть населений пункт' : label}
            fullWidth
            disabled={!address_city}
          />
        )}
    </>

  )
}

export default StreetField