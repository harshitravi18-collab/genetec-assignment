import dayjs from 'dayjs';
import type { DemoEvent } from '../types';

export type TimelineGroup = {
  date: string;
  label: string;
  events: DemoEvent[];
};

export const groupEventsByDay = (events: DemoEvent[]): TimelineGroup[] => {
  const groups = new Map<string, TimelineGroup>();

  events.forEach((event) => {
    const dayKey = dayjs(event.date).format('YYYY-MM-DD');

    if (!groups.has(dayKey)) {
      groups.set(dayKey, {
        date: dayKey,
        label: dayjs(event.date).format('MMMM D, YYYY'),
        events: [],
      });
    }

    groups.get(dayKey)?.events.push(event);
  });

  return Array.from(groups.values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
};
