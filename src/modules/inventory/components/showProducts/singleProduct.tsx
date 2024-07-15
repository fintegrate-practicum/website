import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';
import { json } from 'stream/consumers';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

interface Props {
  product: IProduct | IComponent;
}

const SingleProduct: React.FC<Props> = ({ product }) => {

  const products = useAppSelector((state) => state.product?.data || []);
  const productId=useParams().productId;
  const product1=productId?products.find(p => p.id == productId)!:product;
  
  const { productName, totalPrice } = product1;


  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {productName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Price: {totalPrice} <AttachMoneyOutlinedIcon fontSize='small' />
        </Typography>
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
