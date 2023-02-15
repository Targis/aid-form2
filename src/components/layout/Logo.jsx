import { Box, Typography } from '@mui/material';
import { NavLink } from "react-router-dom";
import LogoXS from 'img/logo50.png'
import UkraineIcon from 'components/icons/UkraineIcon'

import React from 'react'

const Logo = ({ color }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
      <img
        src={LogoXS}
        alt="logo"
        loading="lazy"
        width="32px"
        height="auto"
      />
      <Typography
        color={color || "#fff"}
        variant="title"
        sx={{ position: 'relative', ml: 0.5, mr: 2.5, textDecoration: 'none' }}
        component={NavLink}
        to="orikhiv-aid"
      >
        Оріхівська громада
        <UkraineIcon
          sx={{
            position: 'absolute',
            top: '-50%',
            width: '12px',
            left: '100%',
            marginLeft: '3px',
            // display: {
            //   xs: 'none', sm: 'block'
            // }
          }}
        />
      </Typography>

    </Box>
  )
}

export default Logo
