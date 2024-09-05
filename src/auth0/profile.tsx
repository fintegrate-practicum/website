import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../common/components/Button/Button';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useAppDispatch, useJwtFromCookie } from '../Redux/hooks';
import { fetchUserById } from '../Redux/currentUserSlice';
import SidebarUserDetails from './SidebarUserDetails';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getBasket } from '../modules/orders/features/basket/basketSlice';
import httpService from '../modules/orders/Api-Requests/httpService';
import { getAllItems } from '../modules/orders/Api-Requests/genericRequests';
import { ICart } from '../modules/orders/interfaces/ICart';

const auth0_audience = import.meta.env.VITE_AUTH0_AUDIENCE as string;
const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN as string;

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const dispatch = useAppDispatch();

  function setCookie(name: string, value: string, days: number) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  function getCookie(cookieName: string) {
    const nameEQ = cookieName + '=';
    const cookieArray = document.cookie.split(';');

    for (const elementFromCookie of cookieArray) {
      const trimmedCookie = elementFromCookie.trim();
      if (trimmedCookie.startsWith(nameEQ)) {
        return trimmedCookie.substring(nameEQ.length);
      }
    }

    return null;
  }

  setCookie('user_id', user?.sub as string, 30);

  useEffect(() => {

    const getUserMetadata = async () => {
      const domain = auth0_domain;
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            userId: getCookie('user_id'),
            audience: auth0_audience,
            scope: 'read:current_user',
          },
        });
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const user_metadata = await metadataResponse.json();
        setUserMetadata(user_metadata);
        await dispatch(fetchUserById(user_metadata));
      } catch (e) {
        console.log((e as Error).message);
      }
    };
    const getSavedCartForUser = async () => {
      const userId = useJwtFromCookie('user_id')?.split('|')[1]
      //אמור להשלף מהרידקס ברגע שיטפלו בזה
      const buissnes_code = "615123456"

      try {
        const response = await getAllItems<ICart[]>(`cart/${buissnes_code}/${userId}`)

        console.log('getSavedCartForUser');
        console.log(response.data);  // הנחה שה- httpService מחזיר את האובייקט בתגובה
        dispatch(getBasket(response.data))
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    }

    if (user?.sub) {
      getUserMetadata();
      getSavedCartForUser();
    }
  }, [getAccessTokenSilently, user?.sub,  dispatch]);

  if (isLoading) {
    return <div>{t('auth0.Loading ...')}</div>;
  }

  const profileAvatar = () => {
    let emailUser = '';
    if  (userMetadata)  {
      emailUser = userMetadata.email;
    }
    return {
      sx: {
        bgcolor: 'red',
        position: 'relative',
        width: 37,
        height: 37,
      },
      children: emailUser
        ? `${emailUser.split('')[0][0]}${emailUser.split('')[1][0]}`
        : '',
    };
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isAuthenticated && (
        <Box
          position='absolute'
          top={18}
          right={18}
          onClick={handleClick}
          sx={{ cursor: 'pointer' }}
        >
          <Avatar {...profileAvatar()} src={userMetadata?.picture || ''} />
        </Box>
      )}
      <SidebarUserDetails
        email={userMetadata?.email}
        nickname={userMetadata?.nickname}
        user_id={userMetadata?.user_id}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
      <Button href='/CreateBusiness/BaseDetailsManager' isLink={true}>
        {t('auth0.Register a business')}
      </Button>
    </>
  );
};

export default Profile;
