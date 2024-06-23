import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react';

const auth0_audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN;

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
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
  
       
        const _accessToken = await getAccessTokenSilently();
        console.log(_accessToken, '=======================', accessToken);
        setCookie("accessToken",_accessToken,7)
        // const accessToken = await auth0Client.getTokenSilently();
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const user_metadata = await metadataResponse.json();
  
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
        <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};

export default Profile;