import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import TableComponent from './TableComponent';

const meta = {
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

const Template = (args: any) => {
  const [rows, setRows] = useState(args.dataObject.rows);

  const handleDelete = (index: any) => {
    action('Row deleted')(index);
    const newRows = rows.filter((row: any, i: any) => i !== index);
    setRows(newRows);
  };

  const handleEdit = (index: any) => {
    action('edit deleted')(index);
    const newRows = rows.filter((row: any, i: any) => i !== index);
    setRows(newRows);
  };
  const handleAmountChange = (rowIndex: any, key: any, value: any) => {
    const newRows = [...rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [key]: value };
    setRows(newRows);
    action('Amount changed')(rowIndex, key, value);
  };

  return (
    <TableComponent
      {...args}
      dataObject={{ ...args.dataObject, rows: rows }}
      onDelete={handleDelete}
      onEdit={handleEdit}
      handleAmountChange={handleAmountChange}
      showDeleteButton={args.showDeleteButton}
      showEditButton={args.showEditButton}
    />
  );
};

export const Default: any = Template.bind({});
Default.args = {
  dataObject: {
    headers: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'name', label: 'שם', type: 'text', isImage: true },
      { key: 'age', label: 'גיל', type: 'number', isAmount: true },
      { key: 'city', label: 'עיר', type: 'text' },
      { key: 'price', label: 'מחיר', type: 'text', isPrice: true },
    ],
    rows: [
      {
        id: 1,
        name: 'יונתן',
        profilePic: 'https://via.placeholder.com/50',
        age: 25,
        city: 'תל אביב',
        price: '100',
      },
      {
        id: 2,
        name: 'מיכל',
        profilePic: 'https://via.placeholder.com/50',
        age: 30,
        city: 'ירושלים',
        price: '150',
      },
    ],
  },
  tableSize: 'large',
  showDeleteButton: true,
  showEditButton: true,
};

export const data2: any = Template.bind({});
data2.args = {
  dataObject: {
    headers: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'name', label: 'Name', type: 'text', isImage: true },
      { key: 'profession', label: 'Profession', type: 'text' },
      { key: 'age', label: 'Age', type: 'number' },
      { key: 'city', label: 'City', type: 'text' },
    ],
    rows: [
      {
        id: 1,
        name: 'יונתן',
        profilePic: 'https://via.placeholder.com/50',
        profession: 'אנגלית',
        age: 25,
        city: 'תל אביב',
      },
      {
        id: 2,
        name: 'מיכל',
        profilePic: 'https://via.placeholder.com/50',
        profession: 'חשבון',
        age: 30,
        city: 'ירושלים',
      },
    ],
  },

  tableSize: 'small',
};

export const dataWithImage: any = Template.bind({});
dataWithImage.args = {
  dataObject: {
    headers: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'age', label: 'Age', type: 'number' },
      { key: 'city', label: 'City', type: 'text' },
    ],
    rows: [
      {
        id: 1,
        name: 'יונתן',
        profilePic: 'https://via.placeholder.com/50',
        age: 25,
        city: 'תל אביב',
      },
      {
        id: 2,
        name: 'מיכל',
        profilePic: 'https://via.placeholder.com/50',
        age: 30,
        city: 'ירושלים',
      },
    ],
  },
  tableSize: 'large',
  showDeleteButton: false,
};
export const SmallTable: any = Template.bind({});
SmallTable.args = {
  dataObject: {
    headers: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'age', label: 'Age', type: 'number' },
      { key: 'city', label: 'City', type: 'text' },
    ],
    rows: [
      {
        id: 1,
        name: 'Jonathan',
        profilePic: 'https://via.placeholder.com/50',
        age: 25,
        city: 'Tel Aviv',
      },
      {
        id: 2,
        name: 'Michal',
        profilePic: 'https://via.placeholder.com/50',
        age: 30,
        city: 'Jerusalem',
      },
    ],
  },
  tableSize: 'small',
  showDeleteButton: false,
};

export const LargeTable: any = Template.bind({});
LargeTable.args = {
  dataObject: {
    headers: [
      { key: 'id', label: 'ID', type: 'text' },
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'age', label: 'Age', type: 'number' },
      { key: 'city', label: 'City', type: 'text' },
    ],
    rows: [
      {
        id: 1,
        name: 'Jonathan',
        profilePic: 'https://via.placeholder.com/50',
        age: 25,
        city: 'Tel Aviv',
      },
      {
        id: 2,
        name: 'Michal',
        profilePic: 'https://via.placeholder.com/50',
        age: 30,
        city: 'Jerusalem',
      },
    ],
  },
  tableSize: 'large',
  showDeleteButton: true,
};
