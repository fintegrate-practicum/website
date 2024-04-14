import * as React from 'react';
import { Suspense } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

// add correct nitov
const Home = React.lazy(() => import('./Try'))
const Calendar = React.lazy(() => import('./Try'))
const Orders = React.lazy(() => import('./Try'))
const Employees = React.lazy(() => import('./Try'))
const Inventory = React.lazy(() => import('./Try'))

const drawerWidth = 240;

export default function ResponsiveDrawer() {

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {[{ text: 'Home', icon: HomeIcon },
        { text: 'Calendar', icon: CalendarMonthIcon },
        { text: 'Orders', icon: ShoppingCartIcon },
        { text: 'Employees', icon: GroupIcon },
        { text: 'Inventory', icon: InventoryIcon },
        { text: 'Other', icon: MoreHorizIcon }].map((listItem) => (
          <ListItem key={listItem.text} disablePadding>
            <Link to={listItem.text} >
              <ListItemButton>
                <ListItemIcon>
                  <listItem.icon/>
                </ListItemIcon>
                <ListItemText primary={listItem.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"

          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Routes>
        <Route path="/Home" element={<Suspense fallback={<h1>loading..</h1>}><Home /></Suspense>} />
        <Route path="/Calendar" element={<Suspense fallback={<h1>loading..</h1>}><Calendar /></Suspense>} />
        <Route path="/Orders" element={<Suspense fallback={<h1>loading..</h1>}><Orders /></Suspense>} />
        <Route path="/Employees" element={<Suspense fallback={<h1>loading..</h1>}><Employees /></Suspense>} />
        <Route path="/Inventory" element={<Suspense fallback={<h1>loading..</h1>}><Inventory /></Suspense>} />
      </Routes>
    </Box>
  );
}