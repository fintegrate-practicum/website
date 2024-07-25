import * as React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Button from '../common/components/Button/Button'
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../Redux/hooks';
import { fetchUserById } from '../Redux/currentUserSlice';
import SidebarUserDetails from './SidebarUserDetails';

const auth0_audience = import.meta.env.VITE_AUTH0_AUDIENCE as string;
const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN as string;

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const dispatch = useAppDispatch()

  function setCookie(name: string, value: string, days: number) {

    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/; HttpOnly";
    // Secure

  }

  useEffect(() => {

    const getUserMetadata = async () => {
      const domain = auth0_domain;
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: auth0_audience,
            scope: "read:current_user",
          },

        });
        setCookie("accessToken", accessToken, 7)
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const user_metadata = await metadataResponse.json();
        setUserMetadata(user_metadata);
        dispatch(fetchUserById(user_metadata?.user_id));
      } catch (e) {
        console.log((e as Error).message);
      }
    };

    if (user?.sub) {
      getUserMetadata();
    }
  }, [getAccessTokenSilently, user?.sub, dispatch]);

  if (isLoading) {
    return <div>Loading ...</div>;
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
        height: 37
      },
      children: emailUser ? `${emailUser.split('')[0][0]}${emailUser.split('')[1][0]}` : ''
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
          position="absolute"
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
      <Button
        href="/CreateBusiness/BaseDetailsManager"
        isLink={true}
        value="הרשמה של עסק"
      />;
    </>
  );
};

export default Profile;
