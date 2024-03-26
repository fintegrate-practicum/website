import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import {  useSelector } from 'react-redux';
// import { RootState } from '../types'; // Assuming you have a RootState type defined

interface HeaderProps {
  myComponent: string;
}

const Header: React.FC<HeaderProps> = ({ myComponent }) => {
    //To retrieve a user after creating the state
//   const user = useSelector((state: RootState) => state.user.currentUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ width: '100%' }}>
        <Toolbar>
          <img src="/logo.png" style={{ width: "15%" }} />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {myComponent || "Send component name in props"}
          </Typography>

          {/* {user && <Avatar alt="User Avatar" src={user.imageUrl} />} */}

          {/* Please add the appropriate routing inside the tag of each button in this format
              component={Link} to="/yourRoute"
              according to the routes that will exist
          */}
          
          <IconButton color="inherit">
            <ContactMailIcon />
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

