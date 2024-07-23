import { useAuth0 } from "@auth0/auth0-react";
import Button from '../common/components/Button/Button'

const LoginButton = () => {
  
  const { loginWithRedirect } = useAuth0();

  return   <Button
  onClick={() => loginWithRedirect()}
  href="#"
  isLink={false}
  value="התחברות"
  backgroundColor="#6503A6"
  borderColor="#F2CB05"
  border="1px solid black"
  outlineColor="#F2B704"
  color="white"
/>;
};

export default LoginButton;