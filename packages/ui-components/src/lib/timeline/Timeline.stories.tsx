import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// Shared data

const multiDayEvents = [
  {
    id: '1',
    title: 'System maintenance window',
    date: '2026-04-15T09:00:00.000Z',
    description: 'Scheduled maintenance for internal services.',
    color: 'gray' as const,
  },
  {
    id: '2',
    title: 'Team standup',
    date: '2026-04-15T12:00:00.000Z',
    description: 'Daily sync with the frontend team.',
    color: 'blue' as const,
  },
  {
    id: '3',
    title: 'Release planning',
    date: '2026-04-16T10:00:00.000Z',
    description: 'Planning next sprint release milestones.',
    color: 'green' as const,
  },
  {
    id: '4',
    title: 'Customer feedback review',
    date: '2026-04-16T14:30:00.000Z',
    description: 'Review recent user feedback and priorities.',
    color: 'blue' as const,
  },
  {
    id: '5',
    title: 'Production incident',
    date: '2026-04-17T03:15:00.000Z',
    description: 'Unexpected spike in error rate — on-call paged.',
    color: 'red' as const,
  },
  {
    id: '6',
    title: 'Incident resolved',
    date: '2026-04-17T04:45:00.000Z',
    color: 'green' as const,
  },
];

// Stories
/** Two days of events — the default view. */
export const Default: Story = {
  args: {
    events: multiDayEvents.slice(0, 4),
  },
};

/** Three days including a single-event day to verify singular count label. */
export const MultiDay: Story = {
  args: {
    events: multiDayEvents,
  },
};

/** All events land on the same day — only one group is rendered. */
export const SingleDay: Story = {
  args: {
    events: [
      {
        id: 'a',
        title: 'Morning sync',
        date: '2026-04-15T08:00:00.000Z',
        color: 'blue' as const,
      },
      {
        id: 'b',
        title: 'Design review',
        date: '2026-04-15T11:00:00.000Z',
        description: 'Walk through new component designs.',
        color: 'green' as const,
      },
      {
        id: 'c',
        title: 'Retro',
        date: '2026-04-15T16:00:00.000Z',
        description: 'Sprint retrospective.',
        color: 'blue' as const,
      },
    ],
  },
};

/** Each event colour variant is visible at once. */
export const AllColors: Story = {
  args: {
    events: [
      {
        id: '1',
        title: 'Blue event (default)',
        date: '2026-04-15T09:00:00.000Z',
        color: 'blue' as const,
      },
      {
        id: '2',
        title: 'Green event',
        date: '2026-04-15T10:00:00.000Z',
        color: 'green' as const,
      },
      {
        id: '3',
        title: 'Red / critical event',
        date: '2026-04-15T11:00:00.000Z',
        color: 'red' as const,
      },
      {
        id: '4',
        title: 'Gray / neutral event',
        date: '2026-04-15T12:00:00.000Z',
        color: 'gray' as const,
      },
    ],
  },
};

/** Events given out of order — component must sort them correctly. */
export const UnsortedInput: Story = {
  name: 'Unsorted input (auto-sorted)',
  args: {
    events: [...multiDayEvents].reverse(),
  },
};
