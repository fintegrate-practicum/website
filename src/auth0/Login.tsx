import { useAuth0 } from "@auth0/auth0-react";
// import { Button } from "@mui/material";
import Button from '../common/components/Button/Button'

const LoginButton = () => {
  
  const { loginWithRedirect } = useAuth0();

  return   <Button
  onClick={() => loginWithRedirect()}
  isLink={false}
/>;
  // <Button id="login" variant="contained" onClick={() => loginWithRedirect()}>התחברות</Button>;
};

export default LoginButton;