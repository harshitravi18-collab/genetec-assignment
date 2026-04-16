import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import React from 'react';
import { EventForm } from './EventForm';

const meta: Meta<typeof EventForm> = {
  title: 'Components/EventForm',
  component: EventForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Reusable event form supporting add/edit modes, validation, async save, and error handling.',
      },
    },
  },
  args: {
    mode: 'add',
    onCancel: () => {
      console.log('cancelled');
    },
    onSave: async () => {
      console.log('saved');
    },
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['add', 'edit'],
    },
    initialValues: {
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof EventForm>;

export const Add: Story = {};

export const Edit: Story = {
  args: {
    mode: 'edit',
    initialValues: {
      title: 'Team standup',
      date: dayjs('2026-04-16T12:00:00'),
      description: 'Daily sync with the frontend team.',
    },
  },
};

export const AddPrefilled: Story = {
  args: {
    initialValues: {
      title: 'Sprint review',
      date: dayjs('2026-04-18T15:30:00'),
      description: '',
    },
  },
};

export const LongContent: Story = {
  args: {
    mode: 'edit',
    initialValues: {
      title: 'Quarterly planning workshop',
      date: dayjs('2026-05-02T09:00:00'),
      description:
        'Review roadmap priorities, align dependencies across teams, capture risks, and define milestones. Includes engineering, product, design, and QA stakeholders.',
    },
  },
};

export const Saving: Story = {
  args: {
    onSave: async () =>
      new Promise((resolve) => {
        setTimeout(resolve, 3000);
      }),
  },
};

export const SaveError: Story = {
  args: {
    onSave: async () => {
      throw new Error('Server error - please try again.');
    },
  },
};

export const Narrow: Story = {
  decorators: [
    (StoryComponent) =>
      React.createElement(
        'div',
        { style: { maxWidth: 360 } },
        React.createElement(StoryComponent),
      ),
  ],
};
