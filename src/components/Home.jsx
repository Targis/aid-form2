import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const Home = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 4 }}>Гуманітарна допомога <br /> внутрішньо переміщеним особам (ВПО) <br /> з Оріхівської громади</Typography>

      <div className="form-nav__container1">
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
      </div>
    </>
  )
}

export default Home