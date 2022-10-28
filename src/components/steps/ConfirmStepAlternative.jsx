import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const Confirm = ({
  values: {
    lastName,
    firstName,
    middleName,
    birthday,
    inn,
    socialStatus,
    familySize,
    children,
    city,
    street,
    addrNum,
    addrCorp,
    addrRoom,
    factAddress,
    vpoNumber,
    vpoDate,
    phoneNumber,
  },
}) => {
  const getStreet = () => {
    if (city === 'м.Оріхів') {
      const streetArr = street.split(', ')
      return `${streetArr[1]} ${streetArr[0]}`
    }
    return street
  }

  const fullAddress = `${city}, ${getStreet()}, ${addrNum}${
    addrCorp ? '-' + addrCorp : ''
  } ${addrRoom ? 'кв. ' + addrRoom : ''}`
  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Перевірте правильність введених даних
          </ListSubheader>
        }
      >
        <ListItem>
          <ListItemText
            primary="Повне ім'я"
            secondary={`${lastName} ${firstName} ${middleName}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Дата народження" secondary={birthday} />
        </ListItem>

        <ListItem>
          <ListItemText primary="Номер телефону" secondary={phoneNumber} />
        </ListItem>

        <ListItem>
          <ListItemText primary="Податковий номер" secondary={inn} />
        </ListItem>

        <ListItem>
          <ListItemText primary="Соціальний статус" secondary={socialStatus} />
        </ListItem>

        <ListItem>
          <ListItemText primary="Дорослих" secondary={familySize} />
        </ListItem>

        <ListItem>
          <ListItemText primary="Дітей" secondary={children} />
        </ListItem>

        <ListItem>
          <ListItemText primary="Адреса реєстрації" secondary={fullAddress} />
        </ListItem>

        <ListItem>
          <ListItemText primary="Фактична адреса" secondary={factAddress} />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Довідка ВПО"
            secondary={`від ${vpoDate} № ${vpoNumber}`}
          />
        </ListItem>
      </List>

      <br />

      <br />
    </>
  )
}

export default Confirm
