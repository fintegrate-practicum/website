import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';
import { Link } from 'react-router-dom';

const SingleProduct: React.FC<{ product: IProduct | IComponent }> = ({ product }) => {

  return (
    <Card sx={{ width: 200, maxWidth: '100%', boxShadow: 'lg', margin: 2 }}>
      {product.images && product.images.map((image, index) => (
        <img src={image} alt="product" key={index} />
      ))}
      <CardContent>
        <Link to={`${location.pathname}/${product.id}`} style={{ textDecoration: 'none' }}>
          <Typography variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Price: {product.totalPrice} <AttachMoneyOutlinedIcon fontSize='small' />
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            description: {product.description}
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
