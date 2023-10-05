import React, { useState } from 'react'
import Section from 'components/layout/Section'
import FamilyForm from 'components/family/FamilyForm'
// import FamilySearch from 'components/family/___FamilySearch'
// import TextInput from 'components/inputs/TextInput'

// import { Formik, Form } from 'formik'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
// import Grid from '@mui/material/Grid'
// import Box from '@mui/material/Box'
// import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { normalizePersonData } from 'helpers/normalizeData'
import Swal from 'sweetalert2'
import { action } from 'api'
// import { useEffect } from 'react'
// let render = 1
const FamilyEdit = ({ type }) => {
  // console.log(render++)
  const initialValues = {
    familyId: '',
    fullName: '',
    changes: '',
    reason: ''
  }
  console.log(type)

  const labels = {
    personAdd: 'Додати члена сім\'ї',
    personEdit: 'Внести інші зміни',
    personDelete: 'Видалити особу',
    familyDelete: 'Видалити сім\'ю',
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

  const handleSubmit = (data) => {
    setLoading(true)

    let body = { family: edits.familyId }

    if (type === 'personAdd') {
      const toNormalize = ['firstName', 'lastName', 'middleName', 'street']
      const { id, isHouseholder, ...rest } = data
      body = { ...body, ...normalizePersonData(rest, toNormalize) }
    } else if (type === 'personEdit' || type === 'personDelete' || type === 'familyDelete') {
      body = { ...body, ...data }
    } else {
      throw new Error('Not supported action type')
    }

    fetch(action, {
      method: 'POST',
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify({ type, data: body })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === 'success') {
          clear()
          Swal.fire({
            title: 'Успіх!',
            html: `Заявку на зміну даних сім'ї №${body.family} подано. Зміни будуть застосовані протягом доби`,
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

  const isPersonAddForm = type === 'personAdd'
  const isPersonEditForm = type === 'personEdit'
  const isPersonDeleteForm = type === 'personDelete'
  const isFamilyDeleteForm = type === 'familyDelete'

  return (
    <Section sx={{ textAlign: 'center' }} maxWidth='sm'>

      <Typography variant="h6" sx={{ mb: 4 }}>{type && labels[type]}</Typography>

      {isLoading && <CircularProgress size="2rem" sx={{ ml: 'auto', mr: 'auto', mb: 4 }} />}

      {!family && (
        <>
          <TextField
            label="Номер сім'ї"
            name="familyId"
            value={edits.familyId}
            helperText={error}
            error={!!error}
            fullWidth
            onChange={handleChange}
            disabled={isLoading}
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

          {isPersonAddForm && (
            <FamilyForm submitAction={handleSubmit} isHouseholder={false} />
          )}

          {isPersonEditForm && (
            <>
              <TextField
                label="П.І.Б. особи, якої стосуються зміни"
                name="fullName"
                value={edits.fullName}
                fullWidth
                onChange={handleChange}
                disabled={isLoading}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Опишіть, які зміни потрібно внести"
                name="changes"
                value={edits.changes}
                fullWidth
                onChange={handleChange}
                disabled={isLoading}
                required
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={() => handleSubmit(edits)}
                disabled={isLoading || !edits.fullName || !edits.changes}
              // startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
              >Відправити</Button>
            </>
          )}

          {isPersonDeleteForm && (
            <>
              <TextField
                label="П.І.Б. особи, яку потрібно видалити"
                name="fullName"
                value={edits.fullName}
                fullWidth
                onChange={handleChange}
                disabled={isLoading}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Причина"
                name="reason"
                value={edits.reason}
                fullWidth
                onChange={handleChange}
                disabled={isLoading}
                required
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={() => handleSubmit(edits)}
                disabled={isLoading || !edits.fullName || !edits.reason}
              // startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
              >Відправити</Button>
            </>
          )}
          {isFamilyDeleteForm && (
            <>
              <TextField
                label="Причина"
                name="reason"
                value={edits.reason}
                fullWidth
                onChange={handleChange}
                disabled={isLoading}
                required
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={() => handleSubmit(edits)}
                disabled={isLoading || !edits.reason}
              // startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
              >Відправити</Button>
            </>
          )}
        </>
      )}

    </Section>
  )
}

export default FamilyEdit