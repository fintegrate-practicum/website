
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SideMenu from './SideMenu';
import { Home, Person } from '@mui/icons-material';

const menuItems = [
  { nameToView: 'Home', route: '/home', icon: Home, name: 'home', component: 'div' },
  { nameToView: 'Profile', route: '/profile', icon: Person, name: 'profile', component: 'div' },
];

describe('SideMenu component', () => {
  test('renders SideMenu component without crashing', () => {
    render(
      <MemoryRouter>
        <SideMenu 
          items={[]} 
          setCurrentMenu={() => {}} 
          currentUser={{
            userDetails: {
              userName: '',
              userEmail: '',
              auth0_user_id: ''
            }
          }} 
        />
      </MemoryRouter>
    );
  });

  test('renders SideMenu component with menu items', () => {
    render(
      <MemoryRouter>
        <SideMenu 
          items={menuItems} 
          setCurrentMenu={() => {}} 
          currentUser={{
            userDetails: {
              userName: '',
              userEmail: '',
              auth0_user_id: ''
            }
          }} 
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  test('toggles drawer open and close', () => {
    render(
      <MemoryRouter>
        <SideMenu 
          items={menuItems} 
          setCurrentMenu={() => {}} 
          currentUser={{
            userDetails: {
              userName: '',
              userEmail: '',
              auth0_user_id: ''
            }
          }} 
        />
      </MemoryRouter>
    );

    
    const menuButton = screen.getByTestId('menu-button');
    fireEvent.click(menuButton);

    expect(screen.getByText('Home')).toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(screen.queryByText('Home')).not.toBeVisible();
  });
});

