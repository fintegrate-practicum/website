
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SideMenu from './SideMenu';
import { MemoryRouter } from 'react-router-dom';
import { Home, Person } from '@mui/icons-material';

// הגדרת meta עבור SideMenu
const meta: Meta<typeof SideMenu> = {
  title: 'Components/SideMenu',
  component: SideMenu,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SideMenu>;

// סטורי לדוגמה
export const Default: Story = {
  args: {
    items: [
      { name: 'home', nameToView: 'Home', icon: Home, route: '/home', component: 'HomeComponent' },
      { name: 'profile', nameToView: 'Profile', icon: Person, route: '/profile', component: 'ProfileComponent' },
    ],
    setCurrentMenu: action('setCurrentMenu'),
    currentUser: {
      userDetails: {
        userName: 'John Doe',
        userEmail: 'user@example.com',
        auth0_user_id: 'auth0|123456789',
      },
    },
  },
};

