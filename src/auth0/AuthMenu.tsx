import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./profile";
import LoginButton from "./Login";


const AuthMenu = () => {
    const { isAuthenticated } = useAuth0();
    if (isAuthenticated) {
        return (
             <Profile/>
        )
    }
    return (
      <LoginButton/>  
    )
};

export default AuthMenu;
