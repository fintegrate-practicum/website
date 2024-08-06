import React from 'react';
import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next'; // Assuming you are using react-i18next for translations

const PageLoader = (currentRoute: string) => lazy(() => import(currentRoute));

const LazyRouter = ({ currentRoute }: { currentRoute: string }) => {
  const { t } = useTranslation();

  const PageComponent = PageLoader(currentRoute);

  return (
    <Suspense fallback={<div>{t('loadingText')}</div>}>
      <PageComponent />
    </Suspense>
  );
};

export default LazyRouter;
