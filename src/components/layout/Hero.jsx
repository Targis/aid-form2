import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import heroImage from 'img/hero-image.svg'

const Hero = () => {
  return (
    <Grid container sx={{
      py: 5,
      minHeight: "calc(100vh - 64px)",
      display: "flex",
      alignItems: "center"
    }}>
      <Grid item md={6}>
        <Typography component="h1" variant="h4" sx={{ mb: 4 }}>Гуманітарна допомога <br /> внутрішньо переміщеним особам<br /> з Оріхівської громади</Typography>

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

      </Grid>
      <Grid item md={6} sx={{ px: 2, mb: 15 }}>
        <img src={heroImage} alt="Volonteers" style={{ width: "100%", height: "auto", filter: "grayscale(.3) contrast(0.75)" }} />
      </Grid>

    </Grid>
  )
}

export default Hero