import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const SingleProductDetails = () => {

  const products = useAppSelector((state) => state.product?.data || []);
  const productId = useParams().productId;
  const product = products.find(p => p.id == productId);
  const { name, totalPrice, description, productComponents, isOnSale } = product || {};

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
      <Card sx={{ maxWidth: 800, width: '100%', p: 3 }}>
        <CardContent>
          <Typography variant="h4" component="div">
            {name}
          </Typography>
          <Typography variant="h6">
            {description}
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
}

export default SingleProductDetails;