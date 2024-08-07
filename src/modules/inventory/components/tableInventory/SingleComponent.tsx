import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '../../../../common/components/Button/Button';
import Typography from '../../../../common/components/Typography/Typography';
import { IComponent } from '../../interfaces/IComponent';
import { useTranslation } from 'react-i18next';

const SingleComponent: React.FunctionComponent<{ component: IComponent }> = ({
	component,
}) => {
	const { t } = useTranslation();

	return (
		<>
			<Card sx={{ maxWidth: 345 }}>
				<CardMedia
					sx={{ height: 140 }}
					image={component.images?.at(0)}
					title={component.name}
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						{component.name}
					</Typography>
					<Typography gutterBottom variant='body1' component='div'>
						{t('price')}: {component.componentBuyPrice}
					</Typography>
					<Typography variant='body2' color='textSecondary'>
						{component.description}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size='small'>{t('share')}</Button>
					<Button size='small'>{t('learnMore')}</Button>
				</CardActions>
			</Card>
		</>
	);
};

export default SingleComponent;
