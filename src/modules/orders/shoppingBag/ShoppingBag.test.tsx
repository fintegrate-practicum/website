import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShoppingBag from './ShoppingBag';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('ShoppingBag component', () => {
  it('changes the amount of an item', async () => {
    render(
      <ShoppingBag
        initialBag={[
          {
            id: '1',
            image: '',
            name: 'שמלת בנות חגיגית',
            model: '',
            description: '',
            price: 100,
            size: 0,
            amount: 1,
          },
        ]}
      />,
    );

    const amountInput = screen.getByDisplayValue('1');
    fireEvent.change(amountInput, { target: { value: '2' } });

    waitFor(() => {
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });
  });

  it('removes an item when amount is changed to 0', async () => {
    render(
      <ShoppingBag
        initialBag={[
          {
            id: '1',
            image: '',
            name: 'שמלת בנות חגיגית',
            model: '',
            description: '',
            price: 100,
            size: 0,
            amount: 1,
          },
        ]}
      />,
    );

    const amountInput = screen.getByDisplayValue('1');
    fireEvent.change(amountInput, { target: { value: '0' } });

    waitFor(() => {
      expect(screen.queryByText('שמלת בנות חגיגית')).not.toBeInTheDocument();
    });
  });

  it('displays empty cart message when all items are removed', async () => {
    render(
      <ShoppingBag
        initialBag={[
          {
            id: '1',
            image: '',
            name: 'שמלת בנות חגיגית',
            model: '',
            description: '',
            price: 100,
            size: 0,
            amount: 1,
          },
        ]}
      />,
    );

    window.confirm = vi.fn().mockImplementation(() => true);
    const amountInput = screen.getByDisplayValue('1');
    fireEvent.change(amountInput, { target: { value: '0' } });

    waitFor(() => {
      expect(screen.getByText('bagIsEmpty')).toBeInTheDocument();
    });
  });

  it('calls the payment function when the payment button is clicked', async () => {
    render(
      <ShoppingBag
        initialBag={[
          {
            id: '1',
            image: '',
            name: 'שמלת בנות חגיגית',
            model: '',
            description: '',
            price: 100,
            size: 0,
            amount: 1,
          },
        ]}
      />,
    );

    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);

    waitFor(() => {
      expect(screen.getByText('Order saved successfully')).toBeInTheDocument();
    });
  });
});
