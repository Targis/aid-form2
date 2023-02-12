import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/system';


import Logo from 'components/layout/Logo';
import SocialLinks from 'components/layout/SocialLinks';




// const useStyles = makeStyles(({ palette, typography }) => ({
//   top: {
//     backgroundSize: 'cover',
//     overflow: 'hidden',
//   },
//   middle: {
//     backgroundColor: palette.type === 'dark' ? '#192D36' : palette.action.hover,
//   },
//   bottom: {
//     backgroundColor:
//       palette.type === 'dark' ? '#0F2128' : palette.action.selected,
//   },
//   newsletterText: {
//     color: '#fff',
//     fontSize: '0.875rem',
//     textTransform: 'uppercase',
//   },
//   form: {
//     margin: 0,
//     minWidth: 343,
//     fontSize: '0.875rem',
//   },
//   legalLink: {
//     textTransform: 'uppercase',
//     fontWeight: 'bold',
//     fontSize: '0.75rem',
//     justifyContent: 'center',
//     color: palette.text.hint,
//     letterSpacing: '0.5px',
//   },
//   divider: {
//     height: 2,
//     margin: '-1px 0',
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     filter: 'grayscale(80%)',
//     '& img': {
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//     },
//   },
//   info: {
//     ...typography.caption,
//     color: palette.text.hint,
//     marginTop: 8,
//   }
// }));

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