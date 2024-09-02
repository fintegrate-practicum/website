import { FC, ReactElement } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '../../common/components/Typography/Typography';
import IconButton from '@mui/material/IconButton';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'react-i18next';
// will be constructed during use
// import Avatar from '@mui/material/Avatar';
// import { useSelector } from 'react-redux';
// import { RootState } from '../types';
// import { Link } from 'react-router-dom';

export interface HeaderProps {
  serviceName?: string;
  children?: ReactElement;
}

const Header: FC<HeaderProps> = ({
  serviceName,
  children,
}: HeaderProps): ReactElement => {
  const { t } = useTranslation();

  // To retrieve a user after creating the state
  // const user = useSelector((state: RootState) => state.user.currentUser);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ width: '100%' }}>
        <Toolbar>
          <img src='/logo.png' alt='Logo' style={{ width: '15%' }} />

          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            {serviceName || t('website.Send service name in props')}
          </Typography>

          {/* {user && <Avatar alt="User Avatar" src={user.imageUrl} />} */}

          {/* Please add the appropriate routing inside the tag of each button in this format
              component={Link} to="/yourRoute"
              according to the routes that will exist
          */}
          {children}
          <IconButton color='inherit' aria-label='Contact Mail'>
            <ContactMailIcon />
          </IconButton>
          <IconButton color='inherit' aria-label='Settings'>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
