import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SideMenu from './SideMenu';
import { BrowserRouter as Router } from 'react-router-dom';

const menuItems = [
  { nameToView: 'Document', route: '/document', icon: () => <div data-testid="icon" /> },
  { nameToView: 'Settings', route: '/settings', icon: () => <div data-testid="icon" /> },
];

describe('SideMenu component', () => {
  test('renders SideMenu without crashing', () => {
    const setCurrentMenu = vi.fn();
    render(
      <Router>
        <SideMenu items={menuItems} setCurrentMenu={setCurrentMenu} />
      </Router>
    );

    const icons = screen.getAllByTestId('icon');
    expect(icons).toHaveLength(menuItems.length);
  });

  test('menu button click opens the drawer', async () => {
    const user = userEvent.setup();
    const setCurrentMenu = vi.fn();
    render(
      <Router>
        <SideMenu items={menuItems} setCurrentMenu={setCurrentMenu} />
      </Router>
    );

    const menuButton = screen.getByTestId('menu-button');
    await user.click(menuButton);

  });

  test('clicking on menu item triggers setCurrentMenu', async () => {
    const user = userEvent.setup();
    const setCurrentMenu = vi.fn();
    render(
      <Router>
        <SideMenu items={menuItems} setCurrentMenu={setCurrentMenu} />
      </Router>
    );

    const menuItem = screen.getByText('Document');
    await user.click(menuItem);

    expect(setCurrentMenu).toHaveBeenCalledWith(menuItems[0]);
  });
});
