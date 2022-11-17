import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { NavLink } from "react-router-dom";

import LogoXS from 'img/logo50.png'
import UkraineIcon from 'components/icons/UkraineIcon'

const drawerWidth = 240;
const navItems = [
  {
    label: 'Реєстрація',
    href: 'aid-form2/register'
  },
  {
    label: 'Нагадати номер',
    href: 'aid-form2/reminder'
  }
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Допомога ВПО
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item?.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={NavLink} to={item?.href} >
              <ListItemText primary={item?.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{
        background: '#2E3B55',
        position: 'sticky',
        mb: 5,
      }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
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
              sx={{ position: 'relative', ml: 0.5, mr: 2.5, color: '#fff', textDecoration: 'none' }}
              component={NavLink}
              to="aid-form2"
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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item?.label}
                sx={{ color: '#fff' }}
                component={NavLink} to={item?.href}
              >
                {item?.label}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}


export default DrawerAppBar;