import { Card, Timeline as AntTimeline } from 'antd';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { createTimelineDayHeaderItem } from './TimelineDayHeaderItem';
import {
  createTimelineEventItem,
  getTimelineEventPresentation,
} from './TimelineEventItem';
import { useTimeline } from './useTimeline';
import type { TimelineEvent, TimelineProps } from './Timeline.types';

const srOnlyStyle: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

const defaultGroupAnnouncement = (groupLabel: string, groupSize: number) =>
  `${groupLabel}. ${groupSize} ${groupSize === 1 ? 'event' : 'events'}.`;

const defaultItemAnnouncement = ({
  groupLabel,
  groupSize,
  itemIndex,
  item,
}: {
  groupLabel: string;
  groupSize: number;
  itemIndex: number;
  item: TimelineEvent;
}) => {
  const timeLabel = formatTime(item.date);
  const descriptionLabel = item.description ? `. ${item.description}` : '';
  const typeLabel = getTimelineEventPresentation(item).label;

  return `${groupLabel}. Event ${itemIndex + 1} of ${groupSize}. ${typeLabel}. ${timeLabel}. ${item.title}${descriptionLabel}`;
};

export function Timeline({
  events,
  ariaLabel = 'Event timeline',
  instructionsLabel = 'Use left and right arrow keys to move between days. Use up and down arrow keys to move between events in the selected day.',
  getGroupAnnouncement = defaultGroupAnnouncement,
  getItemAnnouncement = defaultItemAnnouncement,
}: TimelineProps) {
  const { grouped, groupKeys } = useTimeline(events);
  const instanceId = useId();

  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const liveRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastAnnouncedRef = useRef('');
  const focusRequestRef = useRef<{
    groupIndex: number;
    itemIndex: number;
    announceGroup: boolean;
  } | null>(null);

  const getItemId = (day: string, eventId: string) =>
    `${instanceId}-${day}-${eventId}`;

  const announce = (message: string) => {
    const liveNode = liveRef.current;

    if (!liveNode) {
      return;
    }

    if (lastAnnouncedRef.current === message) {
      liveNode.textContent = '';
      window.setTimeout(() => {
        if (liveRef.current) {
          liveRef.current.textContent = message;
        }
      }, 0);
    } else {
      liveNode.textContent = message;
    }

    lastAnnouncedRef.current = message;
  };

  const clampPosition = (groupIndex: number, itemIndex: number) => {
    if (groupKeys.length === 0) {
      return { groupIndex: 0, itemIndex: 0 };
    }

    const safeGroupIndex = Math.max(
      0,
      Math.min(groupIndex, groupKeys.length - 1),
    );
    const day = groupKeys[safeGroupIndex];
    const groupItems = grouped[day] ?? [];
    const safeItemIndex = Math.max(
      0,
      Math.min(itemIndex, Math.max(groupItems.length - 1, 0)),
    );

    return { groupIndex: safeGroupIndex, itemIndex: safeItemIndex };
  };

  const requestFocus = (
    groupIndex: number,
    itemIndex: number,
    announceGroup: boolean,
  ) => {
    const next = clampPosition(groupIndex, itemIndex);

    focusRequestRef.current = {
      groupIndex: next.groupIndex,
      itemIndex: next.itemIndex,
      announceGroup,
    };

    setActiveGroupIndex(next.groupIndex);
    setActiveItemIndex(next.itemIndex);
  };

  useEffect(() => {
    if (groupKeys.length === 0) {
      return;
    }

    const safe = clampPosition(activeGroupIndex, activeItemIndex);

    if (
      safe.groupIndex !== activeGroupIndex ||
      safe.itemIndex !== activeItemIndex
    ) {
      setActiveGroupIndex(safe.groupIndex);
      setActiveItemIndex(safe.itemIndex);
      return;
    }

    const pending = focusRequestRef.current;

    if (!pending) {
      return;
    }

    const day = groupKeys[pending.groupIndex];
    const event = grouped[day]?.[pending.itemIndex];

    if (!day || !event) {
      return;
    }

    const target = itemRefs.current[getItemId(day, event.id)];

    if (!target) {
      return;
    }

    target.focus();

    const itemMessage = getItemAnnouncement({
      groupLabel: day,
      groupSize: grouped[day].length,
      itemIndex: pending.itemIndex,
      item: event,
    });

    const message = pending.announceGroup
      ? `${getGroupAnnouncement(day, grouped[day].length)} ${itemMessage}`
      : itemMessage;

    announce(message);
    focusRequestRef.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeGroupIndex,
    activeItemIndex,
    getGroupAnnouncement,
    getItemAnnouncement,
    grouped,
    groupKeys,
  ]);

  useEffect(() => {
    if (groupKeys.length === 0) {
      return;
    }

    const safe = clampPosition(activeGroupIndex, activeItemIndex);

    if (
      safe.groupIndex !== activeGroupIndex ||
      safe.itemIndex !== activeItemIndex
    ) {
      setActiveGroupIndex(safe.groupIndex);
      setActiveItemIndex(safe.itemIndex);
      return;
    }

    const day = groupKeys[safe.groupIndex];
    const event = grouped[day]?.[safe.itemIndex];

    if (!day || !event) {
      return;
    }

    if (document.activeElement === document.body) {
      focusRequestRef.current = {
        groupIndex: safe.groupIndex,
        itemIndex: safe.itemIndex,
        announceGroup: true,
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGroupIndex, activeItemIndex, grouped, groupKeys]);

  const items = useMemo(
    () =>
      groupKeys.flatMap((day, groupIndex) => {
        const groupEvents = grouped[day] ?? [];
        const headingId = `${instanceId}-heading-${groupIndex}`;

        return [
          createTimelineDayHeaderItem({
            day,
            headingId,
            eventCount: groupEvents.length,
          }),
          ...groupEvents.map((event, itemIndex) => {
            const itemId = getItemId(day, event.id);

            const onKeyDown = (
              keyboardEvent: KeyboardEvent<HTMLButtonElement>,
            ) => {
              switch (keyboardEvent.key) {
                case 'ArrowDown': {
                  keyboardEvent.preventDefault();
                  requestFocus(groupIndex, itemIndex + 1, false);
                  break;
                }
                case 'ArrowUp': {
                  keyboardEvent.preventDefault();
                  requestFocus(groupIndex, itemIndex - 1, false);
                  break;
                }
                case 'ArrowRight': {
                  keyboardEvent.preventDefault();
                  const nextGroupIndex = Math.min(
                    groupIndex + 1,
                    groupKeys.length - 1,
                  );
                  requestFocus(nextGroupIndex, itemIndex, true);
                  break;
                }
                case 'ArrowLeft': {
                  keyboardEvent.preventDefault();
                  const nextGroupIndex = Math.max(groupIndex - 1, 0);
                  requestFocus(nextGroupIndex, itemIndex, true);
                  break;
                }
                case 'Home': {
                  keyboardEvent.preventDefault();
                  requestFocus(groupIndex, 0, false);
                  break;
                }
                case 'End': {
                  keyboardEvent.preventDefault();
                  requestFocus(groupIndex, groupEvents.length - 1, false);
                  break;
                }
                default:
                  break;
              }
            };

            return createTimelineEventItem({
              event,
              isActive:
                groupIndex === activeGroupIndex &&
                itemIndex === activeItemIndex,
              buttonRef: (node) => {
                itemRefs.current[itemId] = node;
              },
              itemId,
              ariaLabel: getItemAnnouncement({
                groupLabel: day,
                groupSize: groupEvents.length,
                itemIndex,
                item: event,
              }),
              onKeyDown,
              onFocus: () => {
                setActiveGroupIndex(groupIndex);
                setActiveItemIndex(itemIndex);

                if (focusRequestRef.current) {
                  return;
                }

                const itemMessage = getItemAnnouncement({
                  groupLabel: day,
                  groupSize: groupEvents.length,
                  itemIndex,
                  item: event,
                });

                announce(itemMessage);
              },
            });
          }),
        ];
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      activeGroupIndex,
      activeItemIndex,
      getItemAnnouncement,
      grouped,
      groupKeys,
      instanceId,
    ],
  );

  return (
    <Card>
      <div
        role="region"
        aria-label={ariaLabel}
        aria-describedby={`${instanceId}-instructions`}
      >
        <p id={`${instanceId}-instructions`} style={srOnlyStyle}>
          {instructionsLabel}
        </p>

        <div
          ref={liveRef}
          aria-live="polite"
          aria-atomic="true"
          style={srOnlyStyle}
        />

        <AntTimeline items={items} />
      </div>

      <style>
        {`
          button[id^="${instanceId}-"]:focus-visible {
            outline: 2px solid #1677ff;
            outline-offset: 2px;
          }
        `}
      </style>
    </Card>
  );
}
