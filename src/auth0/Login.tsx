import { useAuth0 } from '@auth0/auth0-react';
import Button from '../common/components/Button/Button';
import { useTranslation } from 'react-i18next';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { t } = useTranslation();

  return (
    <>
      <Button onClick={() => loginWithRedirect()}>{t('auth0.login')}</Button>;
      <Button href='/CreateBusiness/BaseDetailsManager' isLink={true}>
        {t('Register a business')}
      </Button>
    </>
  );
};

export default LoginButton;
