import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SidebarUserDetails from './SidebarUserDetails';
import { Auth0Provider } from '@auth0/auth0-react';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/SidebarUserDetails',
  component: SidebarUserDetails,
  decorators: [
    (Story, context) => (
      <MemoryRouter initialEntries={['/']}>
        <Auth0Provider
          domain={context.args.domain}
          clientId={context.args.clientId}
          redirectUri={context.args.redirectUri}
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
      <SidebarUserDetails {...args} anchorEl={anchorEl} handleClose={handleClose} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  nickname: 'John Doe',
  email: 'user@example.com',
  user_id: 'auth0|123456789',
  domain: "your-auth0-domain",
  clientId: "your-auth0-clientId",
  redirectUri: window.location.origin
};
