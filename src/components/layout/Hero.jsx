import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Section from 'components/layout/Section';
import { styled } from '@mui/material/styles';
import { NavLink } from "react-router-dom";
import heroImage from 'img/hero-image.svg'

const GridContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column'
  },
}));

const GridImg = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    order: 1,
    marginBottom: '32px'
  },
}));

const GridTitle = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    order: 2
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    fontSize: '1.5rem',
  },
}));

const Hero = () => {
  return (
    <GridContainer maxWidth={'lg'} container sx={{
      pt: 5,
      pb: 0,
      px: 4,
      ml: 'auto',
      mr: 'auto',
      minHeight: "calc(100vh - 64px)",
      display: "flex",
      alignItems: "center"
    }}>
      <GridTitle item md={6}>
        <HeroTitle component="h1" variant="h3" sx={{ mb: 4 }}>Гуманітарна допомога  внутрішньо переміщеним особам <br /> з Оріхівської громади</HeroTitle>

        <Button
          variant="contained"
          size="large"
          component={NavLink}
          to="register"
          sx={{
            mb: 8,
            // width: '100%',
            // maxWidth: '210px'
          }}>
          Обрати категорію
        </Button>

      </GridTitle>
      <GridImg item md={6} sx={{ px: 2, mb: 15 }}>
        <img src={heroImage} alt="Volonteers" style={{ width: "100%", height: "auto", filter: "grayscale(.3) contrast(0.75)" }} />
      </GridImg>

    </GridContainer>
  )
}

export default Hero