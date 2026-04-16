import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
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

/** Default add-mode form with no pre-filled values */
export const Add: Story = {};

/** Edit mode with pre-filled values */
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

/** Add mode with partially filled data */
export const AddPrefilled: Story = {
  args: {
    initialValues: {
      title: 'Sprint review',
      date: dayjs('2026-04-18T15:30:00'),
      description: '',
    },
  },
};

/** Long content to test layout */
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

/** Simulates loading state during save */
export const Saving: Story = {
  args: {
    onSave: async () =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, 3000);
      }),
  },
};

/** Simulates save failure */
export const SaveError: Story = {
  args: {
    onSave: async () => {
      throw new Error('Server error — please try again.');
    },
  },
};

/** Narrow container to test responsiveness */
export const Narrow: Story = {
  decorators: [
    (StoryComponent) => (
      <div style={{ maxWidth: 360 }}>
        <StoryComponent />
      </div>
    ),
  ],
};
