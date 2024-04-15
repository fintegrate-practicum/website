import { Suspense, lazy, useState } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiDrawer from '@mui/material/Drawer';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { styled, Theme, CSSObject } from '@mui/material/styles';

// add correct nitov
const Home = lazy(() => import('./Try'))
const Settings = lazy(() => import('./Try'))

const drawerWidth = 240;

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);

export default function ResponsiveDrawer() {

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [menuItem, setMenuItem] = useState([
    { text: 'בית', icon: HomeIcon },
    { text: 'הגדרות', icon: SettingsIcon }
  ]);

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItem.map((listItem) => (
          <ListItem key={listItem.text} disablePadding sx={{ display: 'block' }}>
            <Link to={listItem.text}>
              <ListItemButton sx={{ px: 4 }} onClick={listItem.text === 'הגדרות' ? handleDrawerClose : handleDrawerOpen}>
                <ListItemIcon>
                  <listItem.icon />
                </ListItemIcon>
                <ListItemText primary={listItem.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }} dir="rtl">
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          anchor="right"
          open={open}
        >
          {drawer}
        </Drawer>
      </Box>
      <Routes>
        <Route path="/בית" element={<Suspense fallback={<h1>loading..</h1>}><Home /></Suspense>} />
        <Route path="/הגדרות" element={<Suspense fallback={<h1>loading..</h1>}><Settings /></Suspense>} />
      </Routes>
    </Box>
  );
}