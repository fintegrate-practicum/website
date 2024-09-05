import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SidebarUserDetails from './SidebarUserDetails';
import { Auth0Provider } from '@auth0/auth0-react';
import { MemoryRouter } from 'react-router-dom';

// הגדרת meta עבור SidebarUserDetails
const meta: Meta<typeof SidebarUserDetails> = {
  title: 'Components/SidebarUserDetails',
  component: SidebarUserDetails,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Auth0Provider
          domain='your-auth0-domain'
          clientId='your-auth0-clientId'
        >
          <Story />
        </Auth0Provider>
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof SidebarUserDetails>;

export default meta;

// סוג הסטורי
type Story = StoryObj<typeof SidebarUserDetails>;

// סטורי לדוגמה
export const Default: Story = {
  args: {
    nickname: 'John Doe',
    email: 'user@example.com',
    user_id: 'auth0|123456789',
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      action('handleClick')(event);
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      action('handleClose')();
      setAnchorEl(null);
    };

    return (
      <div>
        <button onClick={handleClick}>Open Profile</button>
        <SidebarUserDetails
          {...args}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </div>
    );
  },
};
