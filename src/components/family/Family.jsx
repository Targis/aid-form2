import React from 'react'
import Section from 'components/layout/Section'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditIcon from '@mui/icons-material/Edit';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';

const Family = ({ history }) => {

  const pages = [
    {
      text: 'Зареєструвати нову сім\'ю',
      link: 'create',
      icon: <GroupAddIcon />,
      color: ''
    },
    {
      text: 'Уточнити дані сім\'ї',
      link: 'clarify',
      icon: <SwitchAccountIcon />,
      color: ''
    },
    // {
    //   text: 'Додати члена сім\'ї',
    //   link: 'add-person',
    //   icon: <PersonAddAlt1Icon />,
    //   color: 'warning'
    // },
    // {
    //   text: 'Внести інші зміни',
    //   link: 'edit',
    //   icon: <EditIcon />,
    //   color: 'warning'
    // },
    // {
    //   text: 'Видалити сім\'ю',
    //   link: 'remove-family',
    //   icon: <GroupRemoveIcon />,
    //   color: 'error'
    // },
    // {
    //   text: 'Видалити члена сім\'ї',
    //   link: 'remove-person',
    //   icon: <PersonRemoveIcon />,
    //   color: 'error'
    // },
  ]

  return (
    <Section sx={{ textAlign: 'center' }} maxWidth='xs'>
      <Typography variant="h6" sx={{ mb: 4 }}>Оберіть дію</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {pages.map(({ text, link, icon, color }) => (
          <Button variant="contained" sx={{ display: 'flex', alignItems: 'center', my: 1 }} key={link} color={color || 'primary'}>
            {icon} <Link to={`/orikhiv-aid/family/${link}`} style={{ textDecoration: 'none', color: '#fff', marginLeft: '1em' }}>{text}</Link>
          </Button>
        ))}
      </Box>


    </Section>
  )
}

export default Family