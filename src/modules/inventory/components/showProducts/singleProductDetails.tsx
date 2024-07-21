import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';
import { json } from 'stream/consumers';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const SingleProductDetails = () => {
  const products = useAppSelector((state) => state.product?.data || []);
  const productId = useParams().productId;
  const product = products.find(p => p.id === productId);

  // Optional chaining and nullish coalescing operators used here
  const { productName, totalPrice, productDescription, productComponents, isOnSale } = product ?? {};

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
      <Card sx={{ maxWidth: 800, width: '100%', p: 3 }}>
        <CardContent>
          <Typography variant="h4" component="div">
            {productName}
          </Typography>
          <Typography variant="h6">
            {productDescription}
          </Typography>
          {productComponents}
          {isOnSale}
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
    </Box>
  );
};

export default SingleProductDetails;