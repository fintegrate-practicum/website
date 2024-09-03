import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingBag from './ShoppingBag';
import { vi } from 'vitest';
import Toast from '../../../common/components/Toast/Toast';

describe('ShoppingCart component', () => {
  const renderWithToast = (toastMessage: string, toastSeverity: 'success' | 'info' | 'warning' | 'error') => {
    const [toastOpen, setToastOpen] = useState(true);

    return render(
      <>
        <ShoppingBag />
        <Toast
          message={toastMessage}
          severity={toastSeverity}
          open={toastOpen}
          onClose={() => setToastOpen(false)}
        />
      </>
    );
  };

  it('changes the amount of an item', () => {
    render(<ShoppingBag />);

    // Change the amount of the first item to 3
    fireEvent.change(screen.getAllByDisplayValue('1')[0], { target: { value: '3' } });

    // Render toast with success message
    renderWithToast('הכמות עודכנה בהצלחה!', 'success');

    // Check if the total is updated correctly
    expect(screen.getByText('סכום לתשלום 490.50 ₪')).toBeInTheDocument();
  });

  it('removes an item when amount is changed to 0', () => {
    render(<ShoppingBag />);

    // Change the amount of the first item to 0
    fireEvent.change(screen.getAllByDisplayValue('1')[0], { target: { value: '0' } });

    // Render toast with warning message
    renderWithToast('המוצר הוסר מהעגלה בהצלחה!', 'warning');

    // Check if the item is removed
    expect(screen.queryByText('שמלת בנות חגיגית')).not.toBeInTheDocument();
  });

  it('displays empty cart message when all items are removed', () => {
    render(<ShoppingBag />);

    // Simulate window.confirm to always return true
    window.confirm = vi.fn().mockImplementation(() => true);

    // Click the remove button for all items
    screen.getAllByLabelText('הסרת המוצר').forEach(button => fireEvent.click(button));

    // Render toast with info message
    renderWithToast('העגלה שלך ריקה!', 'info');

    // Check if the empty cart message is displayed
    expect(screen.getByText('order.bagIsEmpty')).toBeInTheDocument();
  });

  it('calls the payment function when the payment button is clicked', () => {
    render(<ShoppingBag />);

    // Simulate alert to prevent it from actually showing
    window.alert = vi.fn();

    // Click the payment button
    fireEvent.click(screen.getByText('לתשלום'));

    // Check if the alert function is called
    expect(window.alert).toHaveBeenCalledWith('כפתור התשלום נלחץ');

    // Render toast with success message
    renderWithToast('תשלום החל!', 'success');
  });
});
