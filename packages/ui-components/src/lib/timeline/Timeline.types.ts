export type TimelineEvent = {
  id: string;
  title: string;
  date: string;
  description?: string;
  color?: 'blue' | 'red' | 'green' | 'gray';
};

export type TimelineProps = {
  events: TimelineEvent[];
};
