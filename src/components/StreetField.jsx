import React from 'react'
import { useFormikContext } from 'formik'
import TextInput from './TextInput'
import AutocompleteField from './AutocompliteField'

const StreetField = ({ streets }) => {
  const { values } = useFormikContext()
  return (
    <>
      {values.city === 'м.Оріхів' && (
        <AutocompleteField
          name="street"
          label="Вулиця"
          options={streets}
          fullWidth
        />
      )}

      {values.city !== '' && values.city !== 'м.Оріхів' && (
        <TextInput name="street" label="Вулиця" fullWidth />
      )}
    </>

  )
}

export default StreetField