import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SidebarUserDetails from './SidebarUserDetails';
import { vi } from 'vitest';

// יצירת mock עבור useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  // ייבוא מקורי של כל ה-exports מ-react-router-dom
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// יצירת mock עבור logout מ-Auth0
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
      </Router>,
    );
  });

  test('displays user email and nickname', () => {
    render(
      <Router>
        <SidebarUserDetails {...defaultProps} />
      </Router>,
    );
    const emailElement = screen.getByText(defaultProps.email);
    expect(emailElement).toBeInTheDocument();

    const nicknameElement = screen.getByText(defaultProps.nickname);
    expect(nicknameElement).toBeInTheDocument();
  });

  test('calls navigate when profile button is clicked', () => {
    render(
      <Router>
        <SidebarUserDetails {...defaultProps} />
      </Router>,
    );

    const profileButton = screen.getByText('Profile');
    fireEvent.click(profileButton);

    // בדיקה אם mockNavigate נקרא עם המסלול הנכון
    expect(mockNavigate).toHaveBeenCalledWith('/editProfile');
  });

  test('calls logout function when logout button is clicked', () => {
    render(
      <Router>
        <SidebarUserDetails {...defaultProps} />
      </Router>,
    );
    const logoutButton = screen.getByText('Log out');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
