import { Card, Timeline as AntTimeline } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createTimelineDayHeaderItem } from './TimelineDayHeaderItem';
import { createTimelineEventItem } from './TimelineEventItem';
import { useTimeline } from './useTimeline';
import type { TimelineProps } from './Timeline.types';

export function Timeline({ events }: TimelineProps) {
  const { grouped, groupKeys } = useTimeline(events);

  const [focusedGroup, setFocusedGroup] = useState(0);
  const [focusedItem, setFocusedItem] = useState(0);

  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const day = groupKeys[focusedGroup];
    const event = grouped[day]?.[focusedItem];

    if (liveRef.current && event) {
      liveRef.current.textContent = `${day}, ${event.title}`;
    }
  }, [focusedGroup, focusedItem, grouped, groupKeys]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const day = groupKeys[focusedGroup];
    const items = grouped[day];

    if (!items) {
      return;
    }

    if (event.key === 'ArrowDown') {
      setFocusedItem((previous) => Math.min(previous + 1, items.length - 1));
    }

    if (event.key === 'ArrowUp') {
      setFocusedItem((previous) => Math.max(previous - 1, 0));
    }

    if (event.key === 'ArrowRight') {
      const nextGroup = Math.min(focusedGroup + 1, groupKeys.length - 1);
      setFocusedGroup(nextGroup);
      setFocusedItem(0);
    }

    if (event.key === 'ArrowLeft') {
      const previousGroup = Math.max(focusedGroup - 1, 0);
      setFocusedGroup(previousGroup);
      setFocusedItem(0);
    }
  };

  const items = useMemo(
    () =>
      groupKeys.flatMap((day, groupIndex) => [
        createTimelineDayHeaderItem(day),
        ...grouped[day].map((event, itemIndex) =>
          createTimelineEventItem({
            event,
            isFocused: groupIndex === focusedGroup && itemIndex === focusedItem,
          }),
        ),
      ]),
    [focusedGroup, focusedItem, grouped, groupKeys],
  );

  return (
    <Card>
      <div tabIndex={0} onKeyDown={handleKeyDown}>
        <div
          ref={liveRef}
          aria-live="polite"
          style={{ position: 'absolute', left: -9999 }}
        />

        <AntTimeline items={items} />
      </div>
    </Card>
  );
}
