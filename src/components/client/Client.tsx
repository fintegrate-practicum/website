import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Outlet } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '../../common/components/Typography/Typography';
import Button from '../../common/components/Button/Button';
import Toast from '../../common/components/Toast/Toast';
import { useTranslation } from 'react-i18next';

interface Business {
  id: string;
  companyNumber: string;
  description: string;
  name: string;
  email: string;
  logo: string;
  phone: string;
  owner: string;
  businessSize: string;
  industryType: string;
  establishmentDate: string;
  linkUID: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function LazyClient() {
  const { t } = useTranslation();
  const { linkUID } = useParams<{ linkUID: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const baseUrl = import.meta.env.VITE_INFRA_SERVICE_URL;

  const showToast = (message: string, severity: 'success' | 'error') => {
    setToast({ open: true, message, severity });
  };

  useEffect(() => {
    async function fetchBusinessData() {
      try {
        console.log(`Fetching business data for linkUID: ${linkUID}`);
        const response = await axios.get(`${baseUrl}/business/link/${linkUID}`);
        console.log('Business data fetched successfully:', response.data);
        setBusiness(response.data);
      } catch (error) {
        console.error('Error fetching business data', error);
        showToast(
          'הדף שאת/ה מחפש/ת אינו נמצא. הכנס/י route-הכנס/י ב http://localhost:0000/link/**של עסק linkUID**',
          'error'
        );
      } finally {
        setLoading(false);
      }
    }
    if (linkUID) {
      fetchBusinessData();
    } else {
      setLoading(false);
    }
  }, [linkUID]);

  if (loading) {
    return <Typography>{t('common.Loading...')}</Typography>;
  }

  if (!business) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          flexDirection: 'column',
          textAlign: 'right',
        }}
      >
        <Typography variant='h5'>{t('website.Business Details')}</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography>
            {business.name} : {t('website.Business Name')}
          </Typography>
          <Typography>
            {business.companyNumber} : {t('website.Company Number')}
          </Typography>
          <Typography>
            {business.description} : {t('website.Description')}
          </Typography>
          <Typography>
            {business.email} : {t('website.Email')}
          </Typography>
          <Typography>
            {business.phone} : {t('website.Phone')}
          </Typography>
          <Typography>
            {business.owner} : {t('website.Owner')}
          </Typography>
          <Typography>
            {business.businessSize} : {t('website.Business Size')}
          </Typography>
          <Typography>
            {business.industryType} : {t('website.Industry Type')}
          </Typography>
          <Typography>
            {new Date(business.establishmentDate).toLocaleDateString()} :{' '}
            {t('website.Establishment Date')}
          </Typography>
        </Box>
        <Stack spacing={2} direction='row'>
          <Button>{t('website.Create Order')}</Button>
        </Stack>
      </Box>
      <Outlet />
      <Toast
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
      />
    </>
  );
}
