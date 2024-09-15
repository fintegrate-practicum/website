import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../common/components/Button/Button';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../Redux/hooks';
import { fetchUserById, updateCurrentUser } from '../Redux/currentUserSlice';
import SidebarUserDetails from './SidebarUserDetails';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const auth0_audience = import.meta.env.VITE_AUTH0_AUDIENCE as string;
const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN as string;

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const businessID = '1';// TODO: Replace the temporary variable with the business ID from the URL once it's available 

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
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;// TODO: Update the user's details and add the business ID to their array. 
        // If the user details are valid, update only the business ID without redirecting to the user update page.
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const user_metadata = await metadataResponse.json();
        if (!user_metadata.address) 
          {
            navigate(`/editprofile/${businessID}`);
            }
        else
          if (businessID && user_metadata.businessRoles.some((role: { businessId: string; }) => role.businessId === businessID)) {
            navigate('/business?businessId=${businessID}');
          }
          else{
            dispatch(
              updateCurrentUser({
                ...user_metadata,
                businessRoles: [...user_metadata.businessRoles, businessID],
              }),
            );
            navigate('/business?businessId=${businessID}');
          }
        setUserMetadata(user_metadata);
        await dispatch(fetchUserById(user_metadata));

      } catch (e) {
        console.log((e as Error).message);
      }
    };

    if (user?.sub) {
      getUserMetadata();
    }
  }, [getAccessTokenSilently, user?.sub, dispatch]);

  if (isLoading) {
    return <div>{t('auth0.Loading ...')}</div>;
  }

  const profileAvatar = () => {
    let emailUser = '';
    if (userMetadata) {
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
