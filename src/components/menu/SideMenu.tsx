import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import SidebarUserDetails from '../../auth0/SidebarUserDetails';
import React from 'react';
import MenuItem from './types';
import { UserDetails } from '../../Redux/currentUserSlice';

const drawerWidth = 150;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface Props {
  items: MenuItem[];
  setCurrentMenu: (currentMenu: MenuItem) => void;
  currentUser: { userDetails: Partial<UserDetails> };
}

const SideMenu: FC<Props> = ({ items, setCurrentMenu, currentUser }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleDrawerOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const clickMenuItem = (listItem: MenuItem) => {
    setOpen(false);
    setCurrentMenu(listItem);
  };

  const drawer = (
    <div>
      <Toolbar />
      <IconButton
        sx={{ px: 4, display: 'block' }}
        onClick={open ? handleDrawerClose : handleDrawerOpen}
        data-testid='menu-button'
      >
        <MenuIcon />
      </IconButton>
      <Divider />
      <List>
        {items.map((listItem) => (
          <ListItem
            key={listItem.nameToView}
            disablePadding
            sx={{ display: 'block' }}
          >
            <Link to={listItem.route}>
              <ListItemButton
                sx={{ px: 4 }}
                onClick={() => clickMenuItem(listItem)}
              >
                <ListItemIcon>
                  <listItem.icon />
                </ListItemIcon>
                <ListItemText
                  primary={listItem.nameToView}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }} dir='rtl'>
      <CssBaseline />
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer variant='permanent' anchor='left' open={open}>
          {drawer}
        </Drawer>
      </Box>
      <SidebarUserDetails
        nickname={currentUser.userDetails.userName}
        email={currentUser.userDetails.userEmail}
        user_id={currentUser.userDetails.auth0_user_id}
        anchorEl={anchorEl}
        handleClose={handleDrawerClose}
      />
    </Box>
  );
};

export default SideMenu;
