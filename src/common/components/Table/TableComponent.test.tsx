import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TableComponent from './TableComponent';
import '@testing-library/jest-dom';
import { DataObject } from './interfaces';

describe('<TableComponent />', () => {
  const defaultDataObject: DataObject = {
    headers: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'name', label: 'Name', type: 'text', isImage: true },
      { key: 'age', label: 'Age', type: 'number', isAmount: true },
      { key: 'city', label: 'City', type: 'text' },
      { key: 'price', label: 'Price', type: 'text', isPrice: true },
    ],
    rows: [
      {
        id: 1,
        name: 'Jonathan',
        profilePic: 'https://via.placeholder.com/50',
        age: 25,
        city: 'Tel Aviv',
        price: '100',
      },
      {
        id: 2,
        name: 'Michal',
        profilePic: 'https://via.placeholder.com/50',
        age: 30,
        city: 'Jerusalem',
        price: '150',
      },
    ],
  };

  test('renders TableComponent with default props', () => {
    render(
      <TableComponent
        dataObject={defaultDataObject}
        tableSize='large'
        showDeleteButton={true}
        onDelete={vi.fn()}
        handleAmountChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Jonathan')).toBeInTheDocument();
    expect(screen.getByText('Michal')).toBeInTheDocument();
  });

  test('handles row deletion', () => {
    const handleDelete = vi.fn();
    render(
      <TableComponent
        dataObject={defaultDataObject}
        tableSize='large'
        showDeleteButton={true}
        onDelete={handleDelete}
        handleAmountChange={vi.fn()}
      />,
    );

    const deleteButtons = screen.getAllByLabelText('delete');
    fireEvent.click(deleteButtons[0]);

    expect(handleDelete).toHaveBeenCalledWith(1);
  });

  test('handles amount change', () => {
    const handleAmountChange = vi.fn();
    render(
      <TableComponent
        dataObject={defaultDataObject}
        tableSize='large'
        showDeleteButton={true}
        onDelete={vi.fn()}
        handleAmountChange={handleAmountChange}
      />,
    );

    const amountInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(amountInput, { target: { value: '30' } });

    expect(handleAmountChange).toHaveBeenCalledWith('1', 'age', 30);
  });

  test('displays empty message when no rows are provided', () => {
    render(
      <TableComponent
        dataObject={{ ...defaultDataObject, rows: [] }}
        tableSize='large'
        showDeleteButton={false}
        onDelete={vi.fn()}
        handleAmountChange={vi.fn()}
      />,
    );

    expect(
      screen.getByText('אין מה להציג, נא הכנס נתונים.'),
    ).toBeInTheDocument();
  });

  test('renders correctly with small table size', () => {
    render(
      <TableComponent
        dataObject={defaultDataObject}
        tableSize='small'
        showDeleteButton={false}
        onDelete={vi.fn()}
        handleAmountChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Jonathan')).toBeInTheDocument();
    expect(screen.getByText('Michal')).toBeInTheDocument();
  });
});
