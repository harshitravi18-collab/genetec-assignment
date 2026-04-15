import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGrid } from './DataGrid';

const meta: Meta<typeof DataGrid> = {
  title: 'Components/DataGrid',
  component: DataGrid,
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

export const Default: Story = {};
