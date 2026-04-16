export type TimelineEventType =
  | 'meeting'
  | 'release'
  | 'incident'
  | 'task'
  | 'reminder';

export type TimelineEvent = {
  id: string;
  title: string;
  date: string;
  description?: string;
  color?: 'blue' | 'red' | 'green' | 'gray';
  type?: TimelineEventType;
  typeLabel?: string;
};

export type TimelineProps = {
  events: TimelineEvent[];
  ariaLabel?: string;
  instructionsLabel?: string;
  getGroupAnnouncement?: (groupLabel: string, groupSize: number) => string;
  getItemAnnouncement?: (args: {
    groupLabel: string;
    groupSize: number;
    itemIndex: number;
    item: TimelineEvent;
  }) => string;
};
