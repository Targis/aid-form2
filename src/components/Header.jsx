import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import LogoXS from 'img/logo50.png'
import UkraineIcon from 'components/icons/UkraineIcon'

const Header = () => {
  return (
    <AppBar
      sx={{
        background: '#2E3B55',
        position: 'sticky',
        mb: 5,
      }}
    >
      <Toolbar title="Оріхівська міська рада">
        <img
          src={LogoXS}
          alt="logo"
          loading="lazy"
          width="40px"
          height="40px"
        />

        <Typography
          color="inherit"
          variant="title"
          sx={{ position: 'relative', ml: 0.5 }}
        >
          Оріхівська громада
          <UkraineIcon
            sx={{
              position: 'absolute',
              top: '-50%',
              width: '12px',
              left: '100%',
              marginLeft: '3px',
            }}
          />
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
