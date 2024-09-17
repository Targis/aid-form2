import React, { useEffect, useState, useMemo } from 'react'
import { useFormikContext, useField } from 'formik'
import TextInput from 'components/inputs/TextInput'
import AutocompleteField from 'components/inputs/AutocompliteField'


const StreetField = ({ streets, name, label, ...props }) => {
  // const [options, setOptions] = useState(streets)
  const { values: { address_city } } = useFormikContext()
  // eslint-disable-next-line
  const [field, meta, helpers] = useField(name)
  const { value } = meta

  // reset current street if the city was changed
  useEffect(() => {
    helpers.setValue('')
  }, [address_city]) // eslint-disable-line

  const options = useMemo(() => {
    if (!address_city) return []
    return streets.filter((street) => street.city_name === address_city)
  }, [address_city, streets]);


  return (

    <AutocompleteField
      {...props}
      id={`input-${name}`}
      name={name}
      label={address_city ? label : 'Оберіть населений пункт'}
      options={options}
      disabled={!address_city}
      clearOnBlur
      freeSolo
    />

  )
}

export default StreetField