import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Outlet } from 'react-router-dom';
import { showErrorToast } from "../generic/errorMassage";

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
  const { linkUID } = useParams<{ linkUID: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const http = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    async function fetchBusinessData() {
      try {
        console.log(`Fetching business data for linkUID: ${linkUID}`);
        const response = await axios.get(`${http}/business/link/${linkUID}`);
        console.log('Business data fetched successfully:', response.data);
        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching business data", error);
        setErrorOccurred(true);
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

  useEffect(() => {
    if (errorOccurred) {
      showErrorToast('הדף שאת/ה מחפש/ת אינו נמצא route-הכנס/י ב http://localhost:0000/link/**של עסק linkUID**');
    }
  }, [errorOccurred]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!business) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        flexDirection: 'column',
        textAlign: 'right'
      }}
    >
      <Typography variant="h5">פרטי העסק</Typography>
      <Box sx={{ mb: 2 }}>
        <Typography>{business.name} :שם העסק</Typography>
        <Typography>{business.companyNumber} :מספר חברה</Typography>
        <Typography>{business.description} :תיאור</Typography>
        <Typography>{business.email} :אימייל</Typography>
        <Typography>{business.phone} :טלפון</Typography>
        <Typography>{business.owner} :בעל העסק</Typography>
        <Typography>{business.businessSize} :גודל העסק</Typography>
        <Typography>{business.industryType} :תחום העסק</Typography>
        <Typography>
          {new Date(business.establishmentDate).toLocaleDateString()} :תאריך ייסוד
        </Typography>
      </Box>
      <Stack spacing={2} direction="row">
        <Button variant="contained">צור הזמנה</Button>
      </Stack>
      <Outlet />
    </Box>
  );
}
