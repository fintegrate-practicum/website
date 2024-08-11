import React from 'react';
import { expect, describe, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import DeleteProduct from './DeleteProduct';
import renderWithProviders from "./utils-for-tests.jsx"



describe('DeleteProduct component', () => {

  it('DeleteProduct component test', async () => {
    const item = { id: 1, productName: 'Test Product' };

    renderWithProviders(<DeleteProduct item={item} />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    const dialogTitle = screen.getByText('Are you sure you want to delete this product?');
    expect(dialogTitle).toBeInTheDocument();

    const deleteButtonInDialog = screen.getByText('delete');
    fireEvent.click(deleteButtonInDialog);
  });
})

