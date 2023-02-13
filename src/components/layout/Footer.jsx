import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SocialLinks from 'components/layout/SocialLinks';


const Footer = () => {
  return (
    <Box>
      <Divider />
      <Box width={'100%'}>
        <Grid px={2} py={2} sx={{ textAlign: 'center' }}>
          <Typography color="#878c92" sx={{ mb: 1, fontSize: '12px' }}>
            Слідкуйте за оновленнями:
          </Typography>
          <SocialLinks color="#878c92" />
        </Grid>
      </Box>
    </Box>
  )
}


export default Footer