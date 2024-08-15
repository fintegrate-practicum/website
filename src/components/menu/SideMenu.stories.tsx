
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SideMenu from './SideMenu';
import { MemoryRouter } from 'react-router-dom';
import { Home, Person } from '@mui/icons-material';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../modules/workers/features/reducer'; 

const initialState = {
  currentUserSlice: {
    userDetails: {
      userName: 'User Name',
      userEmail: 'user@example.com',
      auth0_user_id: 'auth0|1234567890', // הוסף id לדוגמה
    },
  },
};

const store = createStore(reducer, initialState);

const meta: Meta<typeof SideMenu> = {
  title: 'Components/SideMenu',
  component: SideMenu,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Provider store={store}>
          <Story />
        </Provider>
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {
  args: {
    items: [
      { name: 'home', nameToView: 'Home', icon: Home, route: '/home', component: 'HomeComponent' },
      { name: 'profile', nameToView: 'Profile', icon: Person, route: '/profile', component: 'ProfileComponent' },
    ],
    setCurrentMenu: action('setCurrentMenu'), 
  },
};

export const EmptyMenu: Story = {
  args: {
    items: [],
    setCurrentMenu: action('setCurrentMenu'), 
  },
};
