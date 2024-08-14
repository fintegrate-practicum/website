import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SideMenu from './SideMenu';
import { Home, Person } from '@mui/icons-material';

const menuItems = [
  { nameToView: 'Home', route: '/home', icon: Home },
  { nameToView: 'Profile', route: '/profile', icon: Person },
];

describe('SideMenu component', () => {

  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <SideMenu items={[]} setCurrentMenu={() => {}} />
      </MemoryRouter>
    );
  });

  test('renders with menu items', () => {
    render(
      <MemoryRouter>
        <SideMenu items={menuItems} setCurrentMenu={() => {}} />
      </MemoryRouter>
    );
  });

});




