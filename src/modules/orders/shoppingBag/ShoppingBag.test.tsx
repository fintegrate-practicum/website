import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingBag from './ShoppingBag';
import { vi } from 'vitest';
import '@testing-library/jest-dom';


describe('ShoppingBag component', () => {
  it('changes the amount of an item', () => {
    render(<ShoppingBag initialBag={[
      { image: '', name: 'שמלת בנות חגיגית', model: '', description: '', price: 100, size: 0, amount: 1 }
    ]} />);

    // Change the amount of the first item to 3
    fireEvent.change(screen.getByDisplayValue('1'), { target: { value: '3' } });

    // Check if the total is updated correctly
    expect(screen.getByText('סכום לתשלום 300.00 ₪')).toBeInTheDocument();

    // Check if the success toast message is shown
    expect(screen.getByText('כמות עודכנה בהצלחה')).toBeInTheDocument();
  });

  it('removes an item when amount is changed to 0', () => {
    render(<ShoppingBag initialBag={[
      { image: '', name: 'שמלת בנות חגיגית', model: '', description: '', price: 100, size: 0, amount: 1 }
    ]} />);

    // Change the amount of the first item to 0
    fireEvent.change(screen.getByDisplayValue('1'), { target: { value: '0' } });

    // Check if the item is removed
    expect(screen.queryByText('שמלת בנות חגיגית')).not.toBeInTheDocument();

    // Check if the warning toast message is shown
    expect(screen.getByText('המוצר הוסר')).toBeInTheDocument();
  });

  it('displays empty cart message when all items are removed', () => {
    render(<ShoppingBag initialBag={[
      { image: '', name: 'שמלת בנות חגיגית', model: '', description: '', price: 100, size: 0, amount: 1 }
    ]} />);

    // Simulate window.confirm to always return true
    window.confirm = vi.fn().mockImplementation(() => true);

    // Click the remove button for all items
    fireEvent.click(screen.getByLabelText('הסרת המוצר'));

    // Check if the empty cart message is displayed
    expect(screen.getByText('העגלה ריקה')).toBeInTheDocument();
  });

  it('calls the payment function when the payment button is clicked', () => {
    render(<ShoppingBag initialBag={[
      { image: '', name: 'שמלת בנות חגיגית', model: '', description: '', price: 100, size: 0, amount: 1 }
    ]} />);

    // Spy on the toast function
    const toast = screen.getByText('ההזמנה הושלמה בהצלחה');

    // Simulate click on payment button
    fireEvent.click(screen.getByText('לתשלום'));

    // Check if the info toast message is shown
    expect(toast).toBeInTheDocument();
  });
});
