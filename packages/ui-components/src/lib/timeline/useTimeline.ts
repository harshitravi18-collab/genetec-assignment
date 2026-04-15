import { useMemo } from 'react';
import type { TimelineEvent } from './Timeline.types';

export const useTimeline = (events: TimelineEvent[]) => {
  const grouped = useMemo(() => {
    const sorted = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    return sorted.reduce<Record<string, TimelineEvent[]>>((acc, event) => {
      const day = new Date(event.date).toDateString();

      if (!acc[day]) {
        acc[day] = [];
      }

      acc[day].push(event);

      return acc;
    }, {});
  }, [events]);

  const groupKeys = Object.keys(grouped);

  return { grouped, groupKeys };
};
