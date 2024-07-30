import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import SidebarUserDetails from './SidebarUserDetails';
import { Auth0Provider } from '@auth0/auth0-react';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/SidebarUserDetails',
  component: SidebarUserDetails,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Auth0Provider
          domain="your-auth0-domain"
          clientId="your-auth0-clientId"
          redirectUri={window.location.origin}
        >
          <Story />
        </Auth0Provider>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof SidebarUserDetails>;

const Template: ComponentStory<typeof SidebarUserDetails> = (args) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button onClick={handleClick}>Open Profile</button>
      <SidebarUserDetails {...args} anchorEl={anchorEl} handleClose={handleClose} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  email: 'user@example.com',
  nickname: 'John Doe',
  user_id: 'auth0|123456789',
};
