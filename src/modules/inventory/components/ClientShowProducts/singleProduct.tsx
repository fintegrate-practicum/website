import React from 'react';
import { Card, CardContent, CardActions } from '@mui/material';
import Typography from '../../../../common/components/Typography/Typography';
import Button from '../../../../common/components/Button/Button';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
interface Props {
  product: IProduct | IComponent;
}

const SingleProduct: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const isProduct = (obj: any): obj is IProduct => {
    return (obj as IProduct).name !== undefined;
  };

  return (
    <Card sx={{ width: 200, maxWidth: '100%', boxShadow: 'lg', margin: 2 }}>
      {product.images &&
        product.images.map((image, index) => (
          <img src={image} alt='product' key={index} />
        ))}
      <CardContent>
        {isProduct(product) ? (
          <Link
            key={product.id}
            to={`${location.pathname}/${product.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Typography variant='h5' component='div'>
              {product.name}
            </Typography>

            <Typography color='textSecondary'>
              {t('inventory.Price')} : {product.totalPrice}{' '}
              <AttachMoneyOutlinedIcon fontSize='small' />
            </Typography>
          </Link>
        ) : (
          <Typography variant='h5' component='div'>
            {product.name}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button>{t('inventory.Add to Cart')}</Button>
      </CardActions>
    </Card>
  );
};

export default SingleProduct;
