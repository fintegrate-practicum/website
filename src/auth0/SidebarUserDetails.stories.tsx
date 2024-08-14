import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SidebarUserDetails from './SidebarUserDetails'; // ודא שהנתיב נכון
import { Auth0Provider } from '@auth0/auth0-react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../modules/workers/features/reducer'; // עדכן את המסלול

// יצירת חנות Redux עם ערכים לדוגמה
const store = createStore(reducer, {
  currentUserSlice: {
    userDetails: {
      userName: 'John Doe',
      userEmail: 'user@example.com',
      auth0_user_id: 'auth0|123456789',
    },
  },
});

// הגדרת הסטורי
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
          <Provider store={store}>
            <Story />
          </Provider>
        </Auth0Provider>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof SidebarUserDetails>;

// הגדרת התבנית לסטורי
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

// סטורי לדוגמה
export const Default = Template.bind({});
Default.args = {
  nickname: 'John Doe',
  email: 'user@example.com',
  user_id: 'auth0|123456789',
  domain: "your-auth0-domain", // עדכן כאן את הדומיין שלך
  clientId: "your-auth0-clientId", // עדכן כאן את ה-clientId שלך
  redirectUri: window.location.origin,
};
