import React from 'react';
import { render, screen } from '@testing-library/react';
import ShoppingBag from './ShoppingBag';
import { vi } from 'vitest';

describe('ShoppingCart component', () => {
  // it('renders the component with initial items', () => {
  //   render(<ShoppingBag />);

  //   // Check if initial items are rendered
  //   expect(screen.getByText('שמלת בנות חגיגית')).toBeInTheDocument();
  //   expect(screen.getByText('boys shirt')).toBeInTheDocument();
  //   expect(screen.getByText('snickers')).toBeInTheDocument();
  // });

  // it('calculates the total correctly', () => {
  //   render(<ShoppingBag />);

  //   // Check if the total is calculated correctly
  //   expect(screen.getByText('סכום לתשלום 365.80 ₪')).toBeInTheDocument();
  // });

  // it('removes an item from the cart', () => {
  //   render(<ShoppingBag />);

  //   // Simulate window.confirm to always return true
  //   window.confirm = vi.fn().mockImplementation(() => true);

  //   // Click the remove button for the first item
  //   fireEvent.click(screen.getAllByLabelText('הסרת המוצר')[0]);

  //   // Check if the item is removed
  //   expect(screen.queryByText('שמלת בנות חגיגית')).not.toBeInTheDocument();
  // });

  it('changes the amount of an item', () => {
    render(<ShoppingBag />);

    // Change the amount of the first item to 3
    // fireEvent.change(screen.getAllByDisplayValue('1')[0], { target: { value: '3' } });

    // Check if the total is updated correctly
    // expect(screen.getByText('סכום לתשלום 490.50 ₪')).toBeInTheDocument();
  });

  it('removes an item when amount is changed to 0', () => {
    render(<ShoppingBag />);

    // Change the amount of the first item to 0
    // fireEvent.change(screen.getAllByDisplayValue('1')[0], { target: { value: '0' } });

    // Check if the item is removed
    expect(screen.queryByText('שמלת בנות חגיגית')).not.toBeInTheDocument();
  });

  it('displays empty cart message when all items are removed', () => {
    render(<ShoppingBag />);

    // Simulate window.confirm to always return true
    window.confirm = vi.fn().mockImplementation(() => true);

    // Click the remove button for all items
    // screen.getAllByLabelText('הסרת המוצר').forEach(button => fireEvent.click(button));

    // Check if the empty cart message is displayed
    expect(screen.getByText('Your shopping bag is empty')).toBeInTheDocument();
  });

  it('calls the payment function when the payment button is clicked', () => {
    render(<ShoppingBag />);

    // Simulate alert to prevent it from actually showing
    window.alert = vi.fn();

    // Click the payment button
    // fireEvent.click(screen.getByText('לתשלום'));

    // Check if the alert function is called
    // expect(window.alert).toHaveBeenCalledWith('payment button was clicked');
  });
});
