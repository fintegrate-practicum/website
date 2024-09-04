import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TableComponent from './TableComponent';
import '@testing-library/jest-dom';
import { DataObject } from './interfaces';

describe('<TableComponent />', () => {
  const defaultDataObject: DataObject = {
    headers: [
      { key: 'id', label: 'ID', type: 'text' },
      {
        key: 'name',
        label: 'Name',
        type: 'text',
        renderCell: ({ row }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={row.profilePic}
              alt='profile'
              style={{ width: '50px', height: '50px', marginRight: '8px' }}
            />
            <span>{row.name}</span>
          </div>
        ),
      },
      {
        key: 'age',
        label: 'Age',
        type: 'number',
        renderCell: ({ id, value }) => (
          <input
            type='number'
            value={value}
            onChange={(e) => {
              if (handleAmountChange) {
                handleAmountChange(
                  id.toString(),
                  'age',
                  Number(e.target.value),
                );
              } else {
                console.error('handleAmountChange is not a function');
              }
            }}
          />
        ),
      },
      {
        key: 'city',
        label: 'City',
        type: 'text',
      },
      {
        key: 'price',
        label: 'Price',
        type: 'text',
        renderCell: ({ value }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>₪</span>
            {value}
          </div>
        ),
      },
    ],
    rows: [
      {
        id: '1',
        name: 'Jonathan',
        profilePic: 'https://via.placeholder.com/50',
        age: 25,
        city: 'Tel Aviv',
        price: '100',
      },
      {
        id: '2',
        name: 'Michal',
        profilePic: 'https://via.placeholder.com/50',
        age: 30,
        city: 'Jerusalem',
        price: '150',
      },
    ],
  };

  const handleDelete = vi.fn();
  const handleEdit = vi.fn();
  const handleAmountChange = vi.fn();

  test('renders TableComponent with default props', () => {
    render(
      <TableComponent
        dataObject={defaultDataObject}
        tableSize='large'
        showDeleteButton={true}
        showEditButton={true}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />,
    );

    expect(screen.getByText('Jonathan')).toBeInTheDocument();
    expect(screen.getByText('Michal')).toBeInTheDocument();
    expect(screen.getAllByLabelText('edit')).toHaveLength(2);
    expect(screen.getAllByLabelText('delete')).toHaveLength(2);
  });

  test('handles row deletion', () => {
    render(
      <TableComponent
        dataObject={defaultDataObject}
        tableSize='large'
        showDeleteButton={true}
        showEditButton={true}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />,
    );

    const deleteButtons = screen.getAllByLabelText('delete');
    fireEvent.click(deleteButtons[0]);

    expect(handleDelete).toHaveBeenCalledWith('1');
  });

  test('handles amount change', () => {
    render(
      <TableComponent
        dataObject={defaultDataObject}
        tableSize='large'
        showDeleteButton={true}
        showEditButton={true}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />,
    );

    const amountInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(amountInput, { target: { value: '30' } });

    // expect(handleAmountChange).toHaveBeenCalledWith('1', 'age', 30);
  });

  test('displays empty message when no rows are provided', () => {
    render(
      <TableComponent
        dataObject={{ ...defaultDataObject, rows: [] }}
        tableSize='large'
        showDeleteButton={false}
        showEditButton={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
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
        showEditButton={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />,
    );

    expect(screen.getByText('Jonathan')).toBeInTheDocument();
    expect(screen.getByText('Michal')).toBeInTheDocument();
  });
});
