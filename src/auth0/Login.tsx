import { useAuth0 } from "@auth0/auth0-react";
import Button from '../common/components/Button/Button'
import { useTranslation } from 'react-i18next';

const LoginButton = () => {
  const { t } = useTranslation();

  const { loginWithRedirect } = useAuth0();

  return  <Button  onClick={() => loginWithRedirect()}>{t("auth0.login")}</Button>;
 
};

export default LoginButton;