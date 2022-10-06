import React from 'react'
import { Grid } from '@mui/material'
import { PatternFormat } from 'react-number-format'

const ConfirmStep = ({ values }) => {
  const { lastName, firstName, middleName, birthday, inn, socialStatus, familySize, children, city, street, addrNum, addrCorp, addrRoom, factAddress, vpoNumber, vpoDate, phoneNumber } = values
  const getStreet = () => {
    if (city === 'м.Оріхів') {
      const streetArr = street.split(', ')
      return `${streetArr[1]} ${streetArr[0]}`
    }
    return street
  }

  const fullName = `${lastName} ${firstName} ${middleName}`
  const familyStructure = `${familySize} / ${children}`
  const fullAddress = `${city}, ${getStreet()}, ${addrNum}${addrCorp ? '-' + addrCorp : ''} ${addrRoom ? 'кв. ' + addrRoom : ''}`
  const vpoDoc = `від ${vpoDate} № ${vpoNumber}`

  const summary = [
    {
      primary: `Повне ім'я`,
      secondary: fullName
    },
    {
      primary: `Дата народження`,
      secondary: birthday,
      format: '##.##.####'
    },
    {
      primary: `Номер телефону`,
      secondary: phoneNumber,
      format: '(###) ### ## ##'
    },
    {
      primary: `Податковий номер`,
      secondary: inn
    },
    {
      primary: `Соціальний статус`,
      secondary: socialStatus
    },
    {
      primary: `Дорослих / дітей`,
      secondary: familyStructure
    },
    {
      primary: `Адреса реєстрації`,
      secondary: fullAddress
    },
    {
      primary: `Фактична адреса`,
      secondary: factAddress
    },
    {
      primary: `Довідка ВПО`,
      secondary: vpoDoc
    },
  ]




  // console.log(values)
  return (

    <div style={{ textAlign: 'left', marginBottom: '2em' }}>
      {summary && summary.map(item => (
        <Grid key={item.primary} container sx={{ py: 2, borderBottom: '1px solid #eee' }}>
          <Grid item xs={12} sm={4}><b>{item.primary}: </b></Grid>
          <Grid item xs={12} sm={8}>{item.format ? <PatternFormat displayType='text' value={item.secondary} format={item.format} /> : item.secondary}</Grid>
        </Grid>
      ))}

    </div>

  )
}

export default ConfirmStep