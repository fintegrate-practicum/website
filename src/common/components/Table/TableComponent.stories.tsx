import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TableComponent from './TableComponent';
import { Row, TableComponentProps, DataObject } from './interfaces';
import TextField from '@mui/material/TextField';

const meta: Meta = {
  title: 'TableComponent',
  component: TableComponent,
  argTypes: {
    dataObject: { control: 'object' },
    tableSize: { control: { type: 'select', options: ['small', 'large'] } },
    showDeleteButton: { control: 'boolean' },
    showEditButton: { control: 'boolean' },
  },
};
export default meta;

const Template: StoryFn<TableComponentProps> = (args) => {
  const [rows, setRows] = useState<Row[]>(args.dataObject.rows);

  const handleDelete = (id: string) => {
    action('Row deleted')(id);
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
  };

  const handleEdit = (row: Row) => {
    action('Row edited')(row);
    // Add your edit logic here
  };

  return (
    <TableComponent
      {...args}
      dataObject={{ ...args.dataObject }}
      onDelete={handleDelete}
      onEdit={handleEdit}
      showDeleteButton={args.showDeleteButton}
      showEditButton={args.showEditButton}
    />
  );
};

const baseProps: DataObject = {
  headers: [
    { key: 'id', label: 'ID', type: 'text' },
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={params.row.image}
            alt='thumbnail'
            style={{ width: '50px', height: '50px', marginRight: '8px' }}
          />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      key: 'age',
      label: 'Age',
      type: 'number',
      renderCell: (params) => {
        return (
          <TextField
            type='number'
            value={params.value}
            onChange={(e) =>
              handleAmountChange(
                params.id.toString(),
                'age',
                Number(e.target.value),
              )
            }
            variant='outlined'
            size='small'
            style={{ width: '100%' }}
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
        );
      },
    },
    { key: 'city', label: 'City', type: 'text' },
    {
      key: 'price',
      label: 'Price',
      type: 'text',
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>₪</span>
          {params.value}
        </div>
      ),
    },
  ],
  rows: [
    {
      id: '1',
      name: 'John Doe',
      profilePic: 'https://via.placeholder.com/50',
      age: 25,
      city: 'New York',
      price: '100',
    },
    {
      id: '2',
      name: 'Jane Smith',
      profilePic: 'https://via.placeholder.com/50',
      age: 30,
      city: 'Los Angeles',
      price: '150',
    },
  ],
};

export const Default = Template.bind({});
Default.args = {
  dataObject: baseProps,
  tableSize: 'large',
  showDeleteButton: true,
  showEditButton: true,
};

export const DataSmall = Template.bind({});
DataSmall.args = {
  dataObject: baseProps,
  tableSize: 'small',
};
const handleAmountChange = (id: string, key: string, value: number) => {
  action('Amount changed')(id, key, value);
};
