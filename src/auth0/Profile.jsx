import { useAuth0 } from "@auth0/auth0-react";
import {  useEffect } from 'react';

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
       expires = `; expires=${date.toUTCString()}`;
      }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
  useEffect(() => {
    const getUserMetadata = async () => {
     
      try {

  
        const _accessToken = await getAccessTokenSilently();
       
        setCookie("accessToken",_accessToken,7)

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
        
     
      </div>
    )
  );
};

export default Profile;