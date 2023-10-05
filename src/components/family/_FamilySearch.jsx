import React, { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import debounce from 'lodash/debounce';
import { action } from 'api'
import { useField } from 'formik'


const FamilySearch = (props) => {

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { name, label } = props
  const [field, meta, helpers] = useField(name)

  const searchFamily = async (query) => {
    setLoading(true);
    if (query) {
      const res = await fetch(action + '?' + new URLSearchParams({ searchQuery: query }), {
        method: 'GET'
      })

      if (res.ok) {
        const data = await res.json()
        // console.log({ data: await data })
        if (data.result === 'error') {
          helpers.setError(data.error)
          setOptions([])
        } else if (data.result === 'notFound') {
          helpers.setError('Нічого не знайдено')
          setOptions([])
        } else if (data.result === 'success') {
          const option = data.data
          const newOptions = [{ label: option.name, id: option.id }]
          setOptions(newOptions)
        }
      } else {
        // console.log('Error on searchFamily', { res })
        throw new Error('network')
      }

    }
    setLoading(false)
  };

  // Debounce the search function to avoid excessive calls
  const debouncedSearch = useRef(debounce(async (q) => {
    await searchFamily(q)
    // console.log({ val })
    // setOptions(val)
  }, 1000)).current;

  const handleInputChange = (event, newInputValue) => {
    console.log({ newInputValue })
    setInputValue(newInputValue);
    debouncedSearch(newInputValue); // Call the debounced search function
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Autocomplete
      {...field}
      {...props}
      // freeSolo
      // disableClearable
      options={options}
      getOptionLabel={(option) => option.label ? `${option.id} (${option.label})` : '...'}
      noOptionsText=""
      loading={loading}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      value={field.value}
      isOptionEqualToValue={(option, value) => {
        console.log(value)
        return option?.id === value
      }}
      onChange={(_, value) => {
        helpers.setValue(value?.id || '')
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}

          helperText={(meta.touched && meta.error) || ' '}
          error={meta.touched && Boolean(meta.error)}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <span>Loading...</span>}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />

  )
}

export default FamilySearch