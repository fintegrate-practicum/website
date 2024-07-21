import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';
import { Link} from 'react-router-dom';

interface Props {
  product: IProduct | IComponent;
}

const SingleProduct: React.FC<Props> = ({ product }) => {
  const isProduct = (obj: any): obj is IProduct => {
    return (obj as IProduct).productName !== undefined;
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        {isProduct(product) ? (
          <Link key={product.id} to={`${location.pathname}/${product.id}`} style={{ textDecoration: 'none' }}>
            <Typography variant="h5" component="div">
              {product.productName}
            </Typography>
            
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Price: {product.totalPrice} <AttachMoneyOutlinedIcon fontSize='small' />
            </Typography>
          </Link>
        ) : (
          <Typography variant="h5" component="div">
            {product.name} 
          </Typography>
        )}
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