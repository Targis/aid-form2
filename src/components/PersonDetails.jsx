import React from 'react'
import { Grid, Typography } from '@mui/material'
import { PatternFormat } from 'react-number-format'

const PersonDetails = ({ values }) => {

  const { last_name, first_name, middle_name, born, tax_number, document, tel, address_city, address_street, address_numbrer, address_corpus, address_room, vpo_address, vpo_number, vpo_date, has_qr, has_disability, disability_group, has_disease, is_soldier_family, is_poor, is_single, is_householder, is_pensioner, notes, need_call } = values
  const getStreet = () => {
    if (address_city === 'Оріхів') {
      const normalizedStreet = address_street.split(', ').reverse().join(' ')
      return normalizedStreet
    }
    return address_street
  }

  const fullName = `${last_name} ${first_name} ${middle_name}`
  const fullAddress = `${address_city}, ${getStreet()}, ${address_numbrer}${address_corpus ? '-' + address_corpus : ''}${address_room ? ', кв. ' + address_room : ''}`
  const vpoDoc = `від ${vpo_date} № ${vpo_number}`

  const disability = has_disability ? `✅ Так (${disability_group})` : '❌ Ні'

  const summary = [
    {
      primary: 'Повне ім\'я',
      secondary: fullName
    },
    {
      primary: 'Дата народження',
      secondary: born,
      format: '##.##.####'
    },
    {
      primary: 'Номер телефону',
      secondary: `${tel}${need_call ? ' (потрібно дзвонити)' : ''}`,
      // format: '(###) ### ## ##'
    },
    {
      primary: 'Податковий номер',
      secondary: tax_number
    },
    {
      primary: 'Паспорт',
      secondary: document
    },
    {
      primary: 'Адреса реєстрації',
      secondary: fullAddress
    },
    {
      primary: 'Фактична адреса',
      secondary: vpo_address
    },
    {
      primary: 'Довідка ВПО',
      secondary: vpoDoc
    },
    {
      primary: 'Наявність QR-коду',
      secondary: has_qr ? '✅ Так' : '❌ Ні'
    },
    {
      primary: 'Пенсіонер за віком',
      secondary: is_pensioner ? '✅ Так' : '❌ Ні'
    },
    {
      primary: 'Інвалідність',
      secondary: disability
    },
    {
      primary: 'Хронічні захворювання',
      secondary: has_disease ? '✅ Так' : '❌ Ні'
    },
    {
      primary: 'Родина військовослужбовця',
      secondary: is_soldier_family ? '✅ Так' : '❌ Ні'
    },
    {
      primary: 'Малозабезпечена родина',
      secondary: is_poor ? '✅ Так' : '❌ Ні'
    },
    {
      primary: 'Одинока мати (батько)',
      secondary: is_single ? '✅ Так' : '❌ Ні'
    },
    {
      primary: 'Примітки',
      secondary: notes
    },
  ]

  return (

    <div style={{ textAlign: 'left' }}>

      {summary && summary.map((item, i) => (
        <Grid key={item.primary} container sx={{ py: 1, borderBottom: i + 1 === summary.length ? 'none' : '1px solid #eee' }}>
          <Grid item xs={12} sm={4} sx={{ fontSize: '.75em' }}><b>{item.primary}: </b></Grid>
          <Grid item xs={12} sm={8}>{item.format ? <PatternFormat displayType='text' value={item.secondary} format={item.format} /> : item.secondary}</Grid>
        </Grid>
      ))}

    </div>

  )
}

export default PersonDetails