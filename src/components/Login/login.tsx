import AuthMenu from "../../auth0/AuthMenu";
import Graphs from "../graphsManagement/graphs";
import "./login.css";
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="App">
            <header>
                <div className="logo">
                    <img src="logo.png" alt="Fintegrate" />
                </div>
                <AuthMenu />
            </header>
            {isAuthenticated ? <><Graphs /></> : null}
        </div>
    );
};

export default Login;
