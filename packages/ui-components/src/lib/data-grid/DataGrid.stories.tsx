import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid } from './DataGrid';
import type { Column } from './DataGrid.types';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
};

const data: Product[] = [
  { id: '1', name: 'Chair', category: 'Furniture', price: 100 },
  { id: '2', name: 'Table', category: 'Furniture', price: 250 },
  { id: '3', name: 'Lamp', category: 'Lighting', price: 80 },
  { id: '4', name: 'Shelf', category: 'Storage', price: 140 },
  { id: '5', name: 'Desk', category: 'Furniture', price: 320 },
  { id: '6', name: 'Bulb', category: 'Lighting', price: 15 },
  { id: '7', name: 'Sofa', category: 'Furniture', price: 800 },
  { id: '8', name: 'Cabinet', category: 'Storage', price: 410 },
  { id: '9', name: 'Mirror', category: 'Decor', price: 90 },
  { id: '10', name: 'Bench', category: 'Furniture', price: 180 },
];

const allColumns: Column<Product>[] = [
  {
    key: 'name',
    label: 'Name',
    accessor: (row) => row.name,
    sortable: true,
    sortAccessor: (row) => row.name,
    filterable: true,
    filterAccessor: (row) => row.name,
  },
  {
    key: 'category',
    label: 'Category',
    accessor: (row) => row.category,
    sortable: true,
    sortAccessor: (row) => row.category,
    filterable: true,
    filterAccessor: (row) => row.category,
  },
  {
    key: 'price',
    label: 'Price',
    accessor: (row) => `$${row.price}`,
    sortable: true,
    sortAccessor: (row) => row.price,
  },
];

const meta: Meta<typeof DataGrid<Product>> = {
  title: 'Components/DataGrid',
  component: DataGrid,
};

export default meta;

type Story = StoryObj<typeof DataGrid<Product>>;

export const Default: Story = {
  args: {
    data,
    columns: allColumns,
    pageSize: 5,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: allColumns,
    loading: true,
    pageSize: 5,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: allColumns,
    pageSize: 5,
  },
};

export const WithError: Story = {
  args: {
    data: [],
    columns: allColumns,
    error: 'Failed to load data',
    pageSize: 5,
  },
};

export const SortableOnly: Story = {
  name: 'Sortable (no filters)',
  args: {
    data,
    columns: allColumns.map((column) => ({
      ...column,
      filterable: false,
      filterAccessor: undefined,
    })),
    pageSize: 5,
  },
};

export const FilterableOnly: Story = {
  name: 'Filterable (no sort)',
  args: {
    data,
    columns: allColumns.map((column) => ({
      ...column,
      sortable: false,
      sortAccessor: undefined,
    })),
    pageSize: 5,
  },
};

export const WithHiddenColumn: Story = {
  name: 'With hidden column',
  args: {
    data,
    columns: allColumns.map((column) =>
      column.key === 'price' ? { ...column, hidden: true } : column,
    ),
    pageSize: 5,
  },
};
