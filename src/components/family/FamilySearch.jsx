import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Swal from 'sweetalert2'
import { action } from 'api'
import Section from 'components/layout/Section'

const FamilySearch = (props) => {

  const { handleChangeFamilyNumber } = props

  const initialValues = {
    familyId: '',
    fullName: '',
    changes: '',
    reason: ''
  }

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  // const [familyId, setFamilyId] = useState('')
  const [family, setFamily] = useState(null)
  // const [changes, setChanges] = useState('')
  // const [fullName, setFullName] = useState('')
  const [edits, setEdits] = useState(initialValues)



  const clear = () => {
    setFamily(null)
    // setFamilyId('')
    setError('')
    setEdits(initialValues)
  }

  const handleSearch = async () => {
    setLoading(true);
    if (edits.familyId) {
      const res = await fetch(action + '?' + new URLSearchParams({ searchQuery: edits.familyId }), {
        method: 'GET'
      })

      if (res.ok) {
        const body = await res.json()
        // console.log({ data: await data })
        if (body.result === 'error') {
          setError(body.data)
        } else if (body.result === 'notFound') {
          setError('Не знайдено')
          handleChangeFamilyNumber(({ success: false, value: edits.familyId }))
        } else if (body.result === 'success') {
          const item = body.data
          setFamily({ label: item.name, id: item.id })
          handleChangeFamilyNumber({ success: true, value: item.id, name: item.name })
        }
      } else {
        // console.log('Error on searchFamily', { res })
        throw new Error('network')
      }

    }
    setLoading(false)
  }

  const chipLabel = family ? `Сім'я №${family.id} (${family.label})` : ''

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setEdits((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    })
  }

  return (
    <Section maxWidth='xs'>

      {!family && (
        <>
          <TextField
            label="Введіть номер сім'ї"
            name="familyId"
            value={edits.familyId}
            helperText={error}
            error={!!error}
            fullWidth
            onChange={handleChange}
            disabled={isLoading}
            type="tel"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={isLoading}
          // startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
          >Знайти</Button>
        </>
      )}
      {family && !isLoading && (
        <>
          <Chip label={chipLabel} color="secondary" onDelete={clear} sx={{ mb: 4 }} />
        </>
      )}
    </Section>
  )
}

export default FamilySearch