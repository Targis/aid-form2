import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const Hero = () => {
  return (
    <Grid container>
      <Grid item>
        <Typography component="h1" variant="h4" sx={{ mb: 4 }}>Гуманітарна допомога <br /> внутрішньо переміщеним особам (ВПО) <br /> з Оріхівської громади</Typography>

        <Button
          variant="contained"
          size="large"
          component={NavLink}
          to="register"
          startIcon={<HowToRegIcon />}
          sx={{
            m: 2,
            width: '100%',
            maxWidth: '210px'
          }}>
          Реєстрація
        </Button>
        <Button
          variant="outlined"
          size="large"
          component={NavLink}
          to="reminder"
          endIcon={<PersonSearchIcon />}
          sx={{
            m: 2,
            width: '100%',
            maxWidth: '210px'
          }}>
          Нагадати номер
        </Button>
      </Grid>
      <Grid item>
        <img src="img/" alt="" />
      </Grid>

    </Grid>
  )
}

export default Hero