import type { Meta, StoryObj } from '@storybook/react';
import SideMenu from './SideMenu';
import * as iconsMaterial from '@mui/icons-material';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof SideMenu> = {
  title: 'Components/SideMenu',
  component: SideMenu,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {
  args: {
    items: [
      { name: 'home', nameToView: 'Home', icon: iconsMaterial.Home, route: '/home', component: 'HomeComponent' },
      { name: 'profile', nameToView: 'Profile', icon: iconsMaterial.Person, route: '/profile', component: 'ProfileComponent' },
    ],
    setCurrentMenu: (currentMenu) => console.log(currentMenu),
  },
};

export const EmptyMenu: Story = {
  args: {
    items: [],
    setCurrentMenu: (currentMenu) => console.log(currentMenu),
  },
};

