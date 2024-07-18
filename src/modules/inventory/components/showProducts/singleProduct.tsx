import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';
import { json } from 'stream/consumers';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

  const SingleProduct: React.FC<{ product: IProduct | IComponent }> = ({ product }) => {
  const isProduct = "productComponents" in product;
  const description = isProduct ? product.productDescription:product.componentDescription ;
  const price = isProduct ? product.totalPrice:product.salePrice;
  const images = isProduct ? product.componentsImages : product.componentImages;

interface Props {
  product: IProduct | IComponent;
}

const SingleProduct: React.FC<Props> = ({ product }) => {
  
  return (
    <Card sx={{ width: 200, maxWidth: '100%', boxShadow: 'lg', margin: 2 }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          {
            images && images.map((image) => (
              <img></img>
              // <img src={image.src} alt={image.alt} key={image.id} />
            ))
          }
        </AspectRatio>
      </CardOverflow>
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
