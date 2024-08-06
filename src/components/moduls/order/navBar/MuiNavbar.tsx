import React, { Suspense } from 'react';
import { AppBar, CircularProgress, Tab, Toolbar } from '@mui/material';
import { Route, Link, Routes } from 'react-router-dom';
// const LazyHome = React.lazy(() => import('./componets/home/home'))
const LazyShoopingBag = React.lazy(() => import('../shoopingBag/ShoopingBag'));
const LazyConnection = React.lazy(() => import('../login/Connection'));
const LazyPayment = React.lazy(() => import('../payment/Payment'));
const LazyAllMyOrders = React.lazy(() => import('../payment/Payment'));
const Navbar = () => {
	return (
		<div>
			<AppBar position='static' sx={{ backgroundColor: ['inherit'] }}>
				<Toolbar sx={{ display: 'flex', flexWrap: 'wrap' }}>
					<Link to='/' style={{ textDecoration: 'none' }}>
						<Tab
							label='לוגו החברה'
							sx={{ color: ['inherit'], fontSize: '20px' }}
						/>
					</Link>
					<Link to='/shoopingBag' style={{ textDecoration: 'none' }}>
						<Tab
							label='סל קניות'
							sx={{ color: ['inherit'], fontSize: '20px' }}
						/>
					</Link>
					<Link to='/connection' style={{ textDecoration: 'none' }}>
						<Tab
							label='התחברות'
							sx={{ color: ['inherit'], fontSize: '20px' }}
						/>
					</Link>
					<Link to='/payment' style={{ textDecoration: 'none' }}>
						<Tab label='תשלום' sx={{ color: ['inherit'], fontSize: '20px' }} />
					</Link>
					<Link to='/allMyOrders' style={{ textDecoration: 'none' }}>
						<Tab
							label='ההזמנות שלי'
							sx={{ color: ['inherit'], fontSize: '20px' }}
						/>
					</Link>
				</Toolbar>
			</AppBar>
			<Routes>
				<Route
					path='/shoopingBag'
					element={
						<Suspense
							fallback={
								<CircularProgress
									sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
								/>
							}
						>
							<LazyShoopingBag />
						</Suspense>
					}
				/>
				<Route
					path='/connection'
					element={
						<Suspense
							fallback={
								<CircularProgress
									sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
								/>
							}
						>
							<LazyConnection />
						</Suspense>
					}
				/>
				<Route
					path='/payment'
					element={
						<Suspense
							fallback={
								<CircularProgress
									sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
								/>
							}
						>
							<LazyPayment />
						</Suspense>
					}
				/>
				<Route
					path='/allMyOrders'
					element={
						<Suspense
							fallback={
								<CircularProgress
									sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
								/>
							}
						>
							<LazyAllMyOrders />
						</Suspense>
					}
				/>
			</Routes>
		</div>
	);
};
export default Navbar;
