import React from 'react';
import { Card, CardContent, CardActions, Typography } from '@mui/material';
import Button from '../../../../common/components/Button/Button'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';
import { json } from 'stream/consumers';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

interface Props {
  product: IProduct | IComponent;
}

const SingleProduct: React.FC<Props> = ({ product }) => {
  
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
      <Link key={product.id}  to={`${location.pathname}/${product.id}`}  style={{ textDecoration: 'none' }}>
        <Typography variant="h5" component="div">
          {product.productName}
        </Typography>
        
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Price: {product.totalPrice} <AttachMoneyOutlinedIcon fontSize='small' />
        </Typography>
      </Link>
      </CardContent>
      <CardActions>
      <Button value="Add to Cart">
        
        </Button>
      </CardActions>
    </Card>
  );
}

export default SingleProduct;
