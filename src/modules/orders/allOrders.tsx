import React, { useEffect, useState } from 'react';
import { Container, Paper, Grid, Typography, List, ListItem, Card, CardContent, CardMedia, CssBaseline, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { IProduct } from '../inventory/interfaces/IProduct';
import { getItemById } from '../inventory/Api-Requests/genericRequests';
import { getAllItems } from './Api-Requests/genericRequests';

const theme = createTheme({
    palette: {
        primary: { main: '#5e318c' },
        secondary: { main: '#421a76' },
        warning: { main: '#5a5c22' },
        success: { main: '#e9bc00' },
        error: { main: '#f4ac00' },
    },
    typography: { fontFamily: 'Arial, sans-serif' },
});

export default function AllOrders() {
    const { businessCode } = useParams<{ businessCode: string }>();
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<{ [key: string]: IProduct }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    if (!businessCode) {
        return <div>אין קוד עסק</div>
    }

    const getOrders = async () => {
        try {
            const res = await getAllItems<any[]>(`orders/${businessCode}`);
            setOrders(res.data);
            fetchProducts(res.data); 
        } catch (err) {
            console.log(err);
        }
    };

    const fetchProducts = async (orders: any[]) => {
        try {
            const productIds = Array.from(new Set(orders.flatMap(order => order.products)));
            const productPromises = productIds.map(id => getItemById<IProduct>(`api/inventory/product`, id));
            const productResults = await Promise.all(productPromises);
            const productsMap = productResults.reduce((acc, product) => {
                acc[product.data.id] = product.data;
                return acc;
            }, {} as { [key: string]: IProduct });
            setProducts(productsMap);
        } catch (err) {
            console.error(err);
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, [businessCode]);

    if (loading) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container>
                    <CircularProgress />
                </Container>
            </ThemeProvider>
        );
    }

    if (error) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container>
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Container>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <Typography variant="h4" color="primary" gutterBottom>
                    All Orders
                </Typography>
                {orders.map((order, index) => (
                    <Paper key={index} style={{ margin: '20px 0', padding: '20px', backgroundColor: '#f4f4f4' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" color="secondary">User: {order.user}</Typography>
                                <Typography variant="body1" color="primary">
                                    Business Code: {order.businessCode}
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    Setting Manager: {order.settingManeger}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" color="secondary">Destination Address</Typography>
                                <Typography variant="body1" color="primary">
                                    City: {order.destinationAddress.city}
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    Street: {order.destinationAddress.street}
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    Building Number: {order.destinationAddress.numBuild}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="secondary">Products</Typography>
                                <List>
                                    {order.products.map((productId: string, productIndex: number) => {
                                        const product = products[productId];
                                        return product ? (
                                            <ListItem key={productId} style={{ padding: '10px 0' }}>
                                                <Card style={{ width: '100%', backgroundColor: '#fafafa', display: 'flex', alignItems: 'center' }}>
                                                    <CardMedia
                                                        component="img"
                                                        style={{ width: 140 }}
                                                        image={product.images[0]}
                                                        alt={product.name}
                                                    />
                                                    <CardContent style={{ flex: '1 0 auto' }}>
                                                        <Typography gutterBottom variant="h5" component="div" color="primary">
                                                            {product.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {product.description}
                                                        </Typography>
                                                        <Typography variant="body1" color="warning">
                                                            Price: ${product.totalPrice}
                                                        </Typography>
                                                        {product.isOnSale && (
                                                            <Typography variant="body1" color="error">
                                                                Sale: {product.salePercentage}%
                                                            </Typography>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </ListItem>
                                        ) : (
                                            <ListItem key={productId}>
                                                <Typography variant="body1" color="error">
                                                    Product ID: {productId}
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
