import { useAuth0 } from '@auth0/auth0-react';
import Button from '../common/components/Button/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Button onClick={() => loginWithRedirect()}>התחברות</Button>;
      <Button href='/CreateBusiness/BaseDetailsManager' isLink={true}>
        הרשמה של עסק
      </Button>
    </>
  );
};

export default LoginButton;
