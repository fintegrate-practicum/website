import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import Toast from './Toast';

const renderToast = (props = {}) => {
  const defaultProps = {
    message: 'Test message',
    severity: 'info' as const,
    open: true,
    onClose: vi.fn(),
    duration: 4000,
  };
  return render(<Toast {...defaultProps} {...props} />);
};

describe('<Toast>', () => {
  test('renders the toast with message', () => {
    renderToast();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('renders the toast with correct severity icon', () => {
    const { container } = renderToast({ severity: 'success' as const });
    expect(container.querySelector('.toastIcon')).toBeInTheDocument();
  });

  test('calls onClose function when close button is clicked', () => {
    const onCloseMock = vi.fn();
    renderToast({ onClose: onCloseMock });
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('does not render when open is false', () => {
    renderToast({ open: false });
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });
});
