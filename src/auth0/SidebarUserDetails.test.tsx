import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SidebarUserDetails from './SidebarUserDetails';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';

const mockLogout = vi.fn();
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    logout: mockLogout,
  }),
}));

describe('SidebarUserDetails component', () => {
  const defaultProps = {
    email: 'user@example.com',
    nickname: 'User',
    user_id: '123',
    anchorEl: document.createElement('div'),
    handleClose: vi.fn(),
  };

  test('renders SidebarUserDetails without crashing', () => {
    render(
      <Router>
        <SidebarUserDetails {...defaultProps} />
      </Router>
    );

  });

  test('displays user email and nickname', () => {
    render(
      <Router>
        <SidebarUserDetails {...defaultProps} />
      </Router>
    );
    const emailElement = screen.getByText(defaultProps.email);
    expect(emailElement).toBeInTheDocument();

    const nicknameElement = screen.getByText(defaultProps.nickname);
    expect(nicknameElement).toBeInTheDocument();
  });

  test('calls handleClickProfile when profile button is clicked', () => {
    render(
      <Router>
        <SidebarUserDetails {...defaultProps} />
      </Router>
    );
    const profileButton = screen.getByText('Profile');
    fireEvent.click(profileButton);
  });

  test('calls logout function when logout button is clicked', () => {
    render(
      <Router>
        <SidebarUserDetails {...defaultProps} />
      </Router>
    );
    const logoutButton = screen.getByText('Log out');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
