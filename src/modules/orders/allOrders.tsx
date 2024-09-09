import { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  CircularProgress,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { IProduct } from '../inventory/interfaces/IProduct';
import { getItemById } from '../inventory/Api-Requests/genericRequests';
import { getAllItems } from './Api-Requests/genericRequests';
import { IOrder } from './interfaces/IOrder';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { getOrders } from './features/order/orderSlice';
import theme from '../../Theme';
import { IComponent } from '../inventory/interfaces/IComponent';
import { useTranslation } from 'react-i18next';
import { getTextDirection } from '../../utils/utils';
export default function AllOrders() {
  const { businessCode } = useParams<{ businessCode: string }>();
  const [products, setProducts] = useState<{
    [key: string]: IProduct | IComponent;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const orders = useAppSelector((state) => state.order?.data || []);
  const { t, i18n } = useTranslation();
  const direction = getTextDirection(i18n.language);
  const memoizedTheme = useMemo(() => theme(direction), [direction]);
  const getAllOrders = async () => {
    try {
      const res = await getAllItems<IOrder[]>(`orders/${businessCode}`);
      dispatch(getOrders(res.data));
      fetchProducts(res.data);
    } catch (err) {
      console.log(err);
      setError(t('order.errorFetchingOrders'));
      setLoading(false);
    }
  };

  const fetchProducts = async (orders: IOrder[]) => {
    try {
      const productIds = Array.from(
        new Set(orders.flatMap((order) => order.products.map((p) => p.id))),
      );

      const fetchProductOrComponent = async (id: string) => {
        try {
          const product = await getItemById<IProduct>(
            `api/inventory/product`,
            id,
          );
          return product.data;
        } catch (error) {
          const component = await getItemById<IComponent>(
            `api/inventory/component`,
            id,
          );
          console.log(error);
          return component.data;
        }
      };

      const productPromises = productIds.map((id) =>
        fetchProductOrComponent(id),
      );
      const productResults = await Promise.all(productPromises);

      const productsMap = productResults.reduce(
        (acc, product) => {
          acc[product.id] = product;
          return acc;
        },
        {} as { [key: string]: IProduct | IComponent },
      );

      setProducts(productsMap);
    } catch (err) {
      console.error(err);
      setError(t('order.errorFetchingProducts'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [businessCode]);

  if (loading) {
    return (
      <ThemeProvider theme={memoizedTheme}>
        <CssBaseline />
        <Container>
          <CircularProgress />
        </Container>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={memoizedTheme}>
        <CssBaseline />
        <Container>
          <Typography variant='h6' color='error'>
            {error}
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }

  if (!businessCode) {
    return <div>{t('order.noBusinessCode')}</div>;
  }
  return (
    <ThemeProvider theme={memoizedTheme}>
      <CssBaseline />
      <Container>
        <Typography variant='h4' color='primary' gutterBottom>
          {t('order.allOrdersTitle')}
        </Typography>
        {orders.map((order, index) => (
          <Paper
            key={index}
            style={{
              margin: '20px 0',
              padding: '20px',
              backgroundColor: '#f4f4f4',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant='h6' color='secondary'>
                  {t('order.userId')}: {order.userId}
                </Typography>
                <Typography variant='body1' color='primary'>
                  {t('order.businessCode')}: {order.businessCode}
                </Typography>
                <Typography variant='body1' color='primary'>
                  {t('order.settingManager')}: {order.settingManeger}
                </Typography>
                <Typography variant='body1' color='primary'>
                  {t('order.deliveryMethod')}: {order.deliveryMethod}
                </Typography>
              </Grid>
              {order.deliveryMethod === 'delivery' && (
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='secondary'>
                    {t('order.destinationAddressTitle')}
                  </Typography>
                  <Typography variant='body1' color='primary'>
                    {t('order.city')}: {order.destinationAddress.city}
                  </Typography>
                  <Typography variant='body1' color='primary'>
                    {t('order.street')}: {order.destinationAddress.street}
                  </Typography>
                  <Typography variant='body1' color='primary'>
                    {t('order.buildingNumber')}:{' '}
                    {order.destinationAddress.numBuild}
                  </Typography>
                  <Typography variant='body1' color='primary'>
                    {t('order.apartmentNumber')}:{' '}
                    {order.destinationAddress.apartmentNumber}
                  </Typography>
                  <Typography variant='body1' color='primary'>
                    {t('order.floor')}: {order.destinationAddress.floor}
                  </Typography>
                  <Typography variant='body1' color='primary'>
                    {t('order.lastName')}: {order.destinationAddress.lastName}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant='h6' color='secondary'>
                  {t('order.productsTitle')}
                </Typography>
                <List>
                  {order.products.map(({ id, qty }) => {
                    const product = products[id];
                    return product ? (
                      <ListItem key={id} style={{ padding: '10px 0' }}>
                        <Card
                          style={{
                            width: '100%',
                            backgroundColor: '#fafafa',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <CardMedia
                            component='img'
                            style={{ width: 140 }}
                            image={
                              product.images && product.images.length > 0
                                ? product.images[0]
                                : undefined
                            }
                            alt={product.name}
                          />
                          <CardContent style={{ flex: '1 0 auto' }}>
                            <Typography
                              gutterBottom
                              variant='h5'
                              component='div'
                              color='primary'
                            >
                              {product.name}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                              {product.description}
                            </Typography>
                            <Typography variant='body1' color='warning'>
                              {t('order.price')}: ${product.totalPrice}
                            </Typography>
                            <Typography variant='body1' color='primary'>
                              {t('order.quantity')}: {qty}
                            </Typography>
                            {product.isOnSale && (
                              <Typography variant='body1' color='error'>
                                {t('order.Sale')}: {product.salePercentage}%
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </ListItem>
                    ) : (
                      <ListItem key={id}>
                        <Typography variant='body1' color='error'>
                          {t('order.Product details unavailable')}
                        </Typography>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Container>
    </ThemeProvider>
  );
}