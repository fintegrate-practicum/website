import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SideMenu from './SideMenu';
import { Home, Person } from '@mui/icons-material';



// הגדרת ה-mock של ה-store
const mockStore = configureStore([]);
const initialState = {
  currentUserSlice: {
    userDetails: {
      userName: 'Test User',
      userEmail: 'test@example.com',
      auth0_user_id: '123',
    },
  },
};

const menuItems = [
  { nameToView: 'Home', route: '/home', icon: Home },
  { nameToView: 'Profile', route: '/profile', icon: Person },
];

describe('SideMenu component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders SideMenu component without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SideMenu items={[]} setCurrentMenu={() => {}} />
        </MemoryRouter>
      </Provider>
    );
  });

  test('renders SideMenu component with menu items', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SideMenu items={menuItems} setCurrentMenu={() => {}} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
  
  test('toggles drawer open and close', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SideMenu items={menuItems} setCurrentMenu={() => {}} />
        </MemoryRouter>
      </Provider>
    );

    const menuButton = screen.getByTestId('menu-button');
    fireEvent.click(menuButton);
    expect(screen.getByText('Home')).toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(screen.queryByText('Home')).not.toBeVisible();
  });
});
