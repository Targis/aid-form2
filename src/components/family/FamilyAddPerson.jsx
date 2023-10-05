import React, { useState } from 'react'
import Section from 'components/layout/Section'
import FamilyForm from 'components/family/FamilyForm'
import FamilySearch from 'components/family/___FamilySearch'
import TextInput from 'components/inputs/TextInput'

import { Formik, Form } from 'formik'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { normalizePersonData } from 'helpers/normalizeData'
import Swal from 'sweetalert2'
import { action } from 'api'

const FamilyAddPerson = () => {

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [familyId, setFamilyId] = useState('')
  const [family, setFamily] = useState(null)

  const clearFamily = () => {
    setFamily(null)
    setFamilyId('')
    setError('')
  }

  const handleSubmit = (data) => {
    setLoading(true)
    const toNormalize = ['firstName', 'lastName', 'middleName', 'street']
    const { id, isHouseholder, ...rest } = data
    const normalizedData = normalizePersonData(rest, toNormalize)

    fetch(action, {
      method: 'POST',
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify({ type: 'edit', data: { ...normalizedData, family: familyId } })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === 'success') {
          clearFamily()
          Swal.fire({
            title: 'Успіх!',
            html: `Заявку на зміни до сім'ї №${familyId} подано. Зміни будуть застосовані протягом доби`,
            icon: 'success',
            showCloseButton: true,
            confirmButtonText: 'Закрити',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          })
        } else if (data.result === 'refused') {
          console.log(1)
          Swal.fire('Відмова', data?.message, 'error')
        } else if (data.result === 'timeout') {
          Swal.fire('', 'Перевищено час очікування. Спробуйте ще.', 'warning')
        } else if (data.result === 'error') {
          console.log(JSON.stringify(data, null, 2))
          Swal.fire({
            title: 'Помилка',
            text: `Щось пішло не так. Спробуйте пізніше.
                Текст помилки: ${data.message}.`,
            icon: 'error',
            confirmButtonText: 'Закрити'
          })
        }
      }).catch(e => { throw new Error(e) }).finally(() => {
        setLoading(false)
      })
  }

  const closeAction = () => {
    console.log('#365')
    return
  }

  const handleSearch = async () => {
    setLoading(true);
    if (familyId) {
      const res = await fetch(action + '?' + new URLSearchParams({ searchQuery: familyId }), {
        method: 'GET'
      })

      if (res.ok) {
        const body = await res.json()
        // console.log({ data: await data })
        if (body.result === 'error') {
          setError(body.data)
        } else if (body.result === 'notFound') {
          setError('Не знайдено')
        } else if (body.result === 'success') {
          const item = body.data
          setFamily({ label: item.name, id: item.id })
        }
      } else {
        // console.log('Error on searchFamily', { res })
        throw new Error('network')
      }

    }
    setLoading(false)
  }

  const chipLabel = family ? `Сім'я №${family.id} (${family.label})` : ''

  const handleFamilyIdChange = (e) => {
    setFamilyId(e.target.value)
  }

  return (
    <Section sx={{ textAlign: 'center' }} maxWidth='md'>

      <Typography variant="h6" sx={{ mb: 4 }}>Додати члена cім'ї</Typography>

      {!family && (
        <>
          <TextField
            label="Номер сім'ї"
            value={familyId}
            helperText={error}
            error={!!error}
            fullWidth
            onChange={handleFamilyIdChange}
            disabled={isLoading}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
          >Знайти</Button>
        </>
      )}

      {family && !isLoading && (
        <>
          <Chip label={chipLabel} color="secondary" onDelete={clearFamily} sx={{ mb: 4 }} />
          <FamilyForm submitAction={handleSubmit} isHouseholder={false} closeAction={closeAction} />
        </>
      )}

    </Section>
  )
}

export default FamilyAddPerson