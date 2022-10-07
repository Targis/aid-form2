import React, { useEffect } from 'react'
import { useFormikContext, useField } from 'formik'
import TextInput from './TextInput'
import AutocompleteField from './AutocompliteField'

const StreetField = ({ streets, name, label }) => {
  const { values: { city } } = useFormikContext()

  const [field, meta, helpers] = useField(name)
  const { value } = meta

  const hasOptions = city === 'м.Оріхів'
  const isOption = streets.findIndex(item => item.label === value) > -1

  let newVal = ''

  if (hasOptions) {
    newVal = isOption ? value : ''
  } else {
    newVal = isOption ? '' : value
  }

  useEffect(() => {
    helpers.setValue(newVal)
  }, [city])

  if (!city) return null

  return (
    <>
      {hasOptions ? (
        <AutocompleteField
          name={name}
          label={label}
          options={streets}
        />
      )

        : (
          <TextInput name={name} label={label}
            fullWidth />
        )}
    </>

  )
}

export default StreetField