import React from 'react'
import { useFormikContext } from 'formik'
import TextInput from './TextInput'
import AutocompleteField from './AutocompliteField'

const StreetField = ({ streets, name, label }) => {
  const { values } = useFormikContext()
  return (
    <>
      {values.city === 'м.Оріхів' && (
        <AutocompleteField
          name={name}
          label={label}
          options={streets}
          fullWidth
        />
      )}

      {values.city !== '' && values.city !== 'м.Оріхів' && (
        <TextInput name={name} label={label} fullWidth />
      )}
    </>

  )
}

export default StreetField