import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';
import { json } from 'stream/consumers';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

<<<<<<< HEAD
const SingleProduct: React.FC<{ product: IProduct | IComponent }> = ({ product }) => {
  const isProduct = "productComponents" in product;
  const description = product.description ;
  const price = product.totalPrice;
  const images = isProduct ? product.componentsImages : product.componentImages as string[] ;
=======
interface Props {
  product: IProduct | IComponent;
}
>>>>>>> 6c05b781c85831c4065d4f54d458bb7179dc80e4

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
        <Button variant="contained" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default SingleProduct;
