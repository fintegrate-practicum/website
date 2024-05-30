import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import LogoutButton from "./Logout";
import LoginButton from "./Login";
import Profile from "./Profile";

const AuthMenu = () => {
    const { user, isAuthenticated } = useAuth0();
    const [showProfile, setShowProfile] = useState(false);
    if (isAuthenticated) {
        return  <div>
            <LogoutButton /> 
            <button onClick={() => setShowProfile(!showProfile)}> {user?.name} </button>
            { showProfile && <Profile /> }
        </div>
    } 
    return <div> <LoginButton /> </div>;
};

export default AuthMenu;