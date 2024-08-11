import { Card, CardContent, CardActions, Button, Box } from '@mui/material';
import Typography from '../../../../common/components/Typography/Typography';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useTranslation } from 'react-i18next';

const SingleProductDetails = () => {
	const products = useAppSelector((state) => state.product?.data || []);
	const { t } = useTranslation();
	const productId = useParams().productId;
	const product = products.find((p) => p.id == productId);
	const { name, totalPrice, description, productComponents, isOnSale } =
		product || {};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				p: 2,
			}}
		>
			<Card sx={{ maxWidth: 800, width: '100%', p: 3 }}>
				<CardContent>
					<Typography variant='h4' component='div'>
						{name}
					</Typography>
					<Typography variant='h6'>{description}</Typography>
					{productComponents}
					{isOnSale}
					<Typography color='textSecondary'>
						{t('inventory.Price')}: {totalPrice}{' '}
						<AttachMoneyOutlinedIcon fontSize='small' />
					</Typography>
				</CardContent>
				<CardActions>
					<Button variant='contained' color='primary'>
						{t('inventory.Add to Cart')}
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default SingleProductDetails;

