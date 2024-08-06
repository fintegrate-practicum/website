import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SideMenu from '../components/menu/SideMenu';
import * as iconsMaterial from '@mui/icons-material';
import { vi } from 'vitest';
import menuItem from '../components/menu/types';

const items: menuItem[] = [
	{ name: 'home', nameToView: 'Home', icon: iconsMaterial.Home, route: '/' },
	{
		name: 'about',
		nameToView: 'About',
		icon: iconsMaterial.Info,
		route: '/about',
	},
];

const setCurrentMenu = vi.fn();

const renderSideMenu = () =>
	render(
		<BrowserRouter>
			<SideMenu items={items} setCurrentMenu={setCurrentMenu} />
		</BrowserRouter>,
	);

test('A properly rendered component', () => {
	renderSideMenu();
	expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('Opening and closing the menu', () => {
	renderSideMenu();

	const menuButton = screen.getAllByRole('button')[0];

	fireEvent.click(menuButton);
	expect(screen.getByText('Home')).toBeVisible();
	expect(screen.getByText('About')).toBeVisible();

	fireEvent.click(menuButton);
	expect(screen.queryByText('Home')).not.toBeVisible();
	expect(screen.queryByText('About')).not.toBeVisible();
});

test('Clicking on a menu item', () => {
	renderSideMenu();

	const menuButton = screen.getAllByRole('button')[0];

	fireEvent.click(menuButton);

	const homeMenuItem = screen.getByText('Home');
	fireEvent.click(homeMenuItem);

	expect(setCurrentMenu).toHaveBeenCalledWith(items[0]);
});
