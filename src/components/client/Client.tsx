import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface LinkUID {
  linkUID: string;
}

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

export default function Client(props: LinkUID) {

  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchBusinessData() {
      try {
        console.log(`Fetching business data for linkUID: ${props.linkUID}`);
        const response = await axios.get(`http://localhost:4000/business/linkUID/${props.linkUID}`);
        console.log('Business data fetched successfully:', response.data);
        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching business data", error);
        setBusiness(null);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    if (props.linkUID) {
      fetchBusinessData();
    } else {
      setLoading(false);
    }
  }, [props.linkUID]);


  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (notFound) {
    return <Typography>חיפוש שגוי, לא נמצאו נתונים</Typography>;
  }

  if (!business) {
    return (
      <>
        <Typography>של הדפדפן route-הכנס ב</Typography>
        <Typography>http://localhost:0000/linkUID/**של עסק linkUID**</Typography>
      </>
    )
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
        <Button variant="contained">התחברות</Button>
      </Stack>
    </Box>
  );
}