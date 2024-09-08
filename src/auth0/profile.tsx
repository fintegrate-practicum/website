import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../common/components/Button/Button';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { fetchUserById, updateCurrentUser } from '../Redux/currentUserSlice';
import SidebarUserDetails from './SidebarUserDetails';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const auth0_audience = 'https://dev-14d7lww6ch5of26k.us.auth0.com/api/v2/';
const auth0_domain = 'dev-14d7lww6ch5of26k.us.auth0.com';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const b = '1';
  const currentUser = useAppSelector(
    (state) => state.currentUserSlice.userDetails,
  );
  // פונקציות לניהול Cookies
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

  // שמירת מזהה המשתמש ב-Cookie לאחר ההתחברות
  useEffect(() => {
    if (user?.sub) {
      setCookie('user_id', user.sub, 30);
    }
  }, [user?.sub]);

  // בדיקת משתמש בעת ההתחברות והפנייתו לדף המתאים
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
        await dispatch(fetchUserById(user_metadata.user_id));

        if (currentUser.userName.length === 0) {
          // במידה והמשתמש לא קיים, הפנייתו לדף מילוי הפרטים
          //navigate(`/addClient?businessId=${b}`);
          navigate(`/editProfile?businessId=${b}`);
        } else {
          // במידה והמשתמש קיים, בדיקת מזהה העסק
          // מניחים שמזהה העסק נשמר ב-Cookie או שהתקבל בדרך אחרת
          if (
            b &&
            currentUser.businessRoles.some((role) => role.businessId === b)
          ) {
            // במידה ומזהה העסק קיים, הפניית המשתמש לדף הראשי
            navigate(`/userBusiness?businessId=${b}`);
          } else {
            // במידה ומזהה העסק לא קיים, הוספתו למערך והפנייה לדף הראשי
            dispatch(
              updateCurrentUser({
                ...currentUser,
                businessRoles: [...currentUser.businessRoles, b],
              }),
            );
            navigate(`/userBusiness?businessId=${b}`);
          }
        }
      } catch (e) {
        console.log((e as Error).message);
      }
    };

    if (user?.sub) {
      getUserMetadata();
    }
  }, [getAccessTokenSilently, user?.sub, dispatch, navigate]);

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

// import * as React from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import Button from '../common/components/Button/Button';
// import { useState, useEffect } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import { useAppDispatch } from '../Redux/hooks';
// import { fetchUserById } from '../Redux/currentUserSlice';
// import SidebarUserDetails from './SidebarUserDetails';
// import { useTranslation } from 'react-i18next';

// // const auth0_audience = import.meta.env.VITE_AUTH0_AUDIENCE as string;
// // const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
// const auth0_audience = 'https://dev-14d7lww6ch5of26k.us.auth0.com/api/v2/'
// const auth0_domain = 'dev-14d7lww6ch5of26k.us.auth0.com'

// const Profile: React.FC = () => {
//   const { t } = useTranslation();
//   const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
//     useAuth0();
//   const [userMetadata, setUserMetadata] = useState<any>(null);
//   const dispatch = useAppDispatch();

//   function setCookie(name: string, value: string, days: number) {
//     let expires = '';
//     if (days) {
//       const date = new Date();
//       date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//       expires = `; expires=${date.toUTCString()}`;
//     }
//     document.cookie = name + '=' + (value || '') + expires + '; path=/';
//   }

//   function getCookie(cookieName: string) {
//     const nameEQ = cookieName + '=';
//     const cookieArray = document.cookie.split(';');

//     for (const elementFromCookie of cookieArray) {
//       const trimmedCookie = elementFromCookie.trim();
//       if (trimmedCookie.startsWith(nameEQ)) {
//         return trimmedCookie.substring(nameEQ.length);
//       }
//     }

//     return null;
//   }

//   setCookie('user_id', user?.sub as string, 30);

//   useEffect(() => {
//     const getUserMetadata = async () => {
//       const domain = auth0_domain;
//       try {
//         const accessToken = await getAccessTokenSilently({
//           authorizationParams: {
//             userId: getCookie('user_id'),
//             audience: auth0_audience,
//             scope: 'read:current_user',
//           },
//         });
//         const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
//         const metadataResponse = await fetch(userDetailsByIdUrl, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         const user_metadata = await metadataResponse.json();
//         setUserMetadata(user_metadata);
//         await dispatch(fetchUserById(user_metadata));
//       } catch (e) {
//         console.log((e as Error).message);
//       }
//     };

//     if (user?.sub) {
//       getUserMetadata();
//     }
//   }, [getAccessTokenSilently, user?.sub, dispatch]);

//   if (isLoading) {
//     return <div>{t('auth0.Loading ...')}</div>;
//   }

//   const profileAvatar = () => {
//     let emailUser = '';
//     if (userMetadata) {
//       emailUser = userMetadata.email;
//     }
//     return {
//       sx: {
//         bgcolor: 'red',
//         position: 'relative',
//         width: 37,
//         height: 37,
//       },
//       children: emailUser
//         ? `${emailUser.split('')[0][0]}${emailUser.split('')[1][0]}`
//         : '',
//     };
//   };

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       {isAuthenticated && (
//         <Box
//           position='absolute'
//           top={18}
//           right={18}
//           onClick={handleClick}
//           sx={{ cursor: 'pointer' }}
//         >
//           <Avatar {...profileAvatar()} src={userMetadata?.picture || ''} />
//         </Box>
//       )}
//       <SidebarUserDetails
//         email={userMetadata?.email}
//         nickname={userMetadata?.nickname}
//         user_id={userMetadata?.user_id}
//         anchorEl={anchorEl}
//         handleClose={handleClose}
//       />
//       <Button href='/CreateBusiness/BaseDetailsManager' isLink={true}>
//         {t('auth0.Register a business')}
//       </Button>
//     </>
//   );
// };

// export default Profile;
