import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./Login";
import Profile from './profile';

const AuthMenu = () => {
    const { user, isAuthenticated } = useAuth0();
    if (isAuthenticated) {

        return (
            <div>
                <Profile/>
            </div>
        );
    }
    return (
        <div>
            <LoginButton />
        </div>
    );
};

export default AuthMenu;
