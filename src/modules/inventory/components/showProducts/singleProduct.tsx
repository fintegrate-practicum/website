import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { IProduct } from '../../interfaces/IProduct'
import { IComponent } from '../../interfaces/IComponent';

const SingleProduct: React.FC<{ product: IProduct | IComponent }> = ({ product }) => {
  const isProduct = "productComponents" in product;
  const description = isProduct ? product.productDescription:product.componentDescription ;
  const price = isProduct ? product.totalPrice:product.salePrice;
  const images = isProduct ? product.componentsImages : product.componentImages;

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
        <Typography>
          {description}
        </Typography>
        <Typography level="h4">
          {price}<AttachMoneyOutlinedIcon fontSize='small' />
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="danger" size="lg">
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}
export default SingleProduct;