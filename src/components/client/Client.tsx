import Stack from '@mui/material/Stack';
import Button from '../../common/components/Button/Button';
import Box from '@mui/material/Box';
import Typography from '../../common/components/Typography/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Outlet } from 'react-router-dom';
import { showErrorToast } from '../generic/errorMassage';
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
	const { linkUID } = useParams<{ linkUID: string }>();
	const [business, setBusiness] = useState<Business | null>(null);
	const [loading, setLoading] = useState(true);
	const [errorOccurred, setErrorOccurred] = useState(false);
	const baseUrl = import.meta.env.VITE_INFRA_SERVICE_URL;

	useEffect(() => {
		async function fetchBusinessData() {
			try {
				console.log(`Fetching business data for linkUID: ${linkUID}`);
				const response = await axios.get(`${baseUrl}/business/link/${linkUID}`);
				console.log('Business data fetched successfully:', response.data);
				setBusiness(response.data);
			} catch (error) {
				console.error('Error fetching business data', error);
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
			showErrorToast(
				'הדף שאת/ה מחפש/ת אינו נמצא route-הכנס/י ב http://localhost:0000/link/**של עסק linkUID**',
			);
		}
	}, [errorOccurred]);

	if (loading) {
		return <Typography>Loading...</Typography>;
	}

	if (!business) {
		return null;
	}

	const { t } = useTranslation();

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
		</>
	);
}
