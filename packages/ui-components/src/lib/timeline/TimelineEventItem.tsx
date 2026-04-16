import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  NotificationOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Card, Space, Tag, Typography } from 'antd';
import type { KeyboardEventHandler, ReactNode, RefCallback } from 'react';
import type { TimelineEvent, TimelineEventType } from './Timeline.types';

type Props = {
  event: TimelineEvent;
  isActive: boolean;
  buttonRef: RefCallback<HTMLButtonElement>;
  itemId: string;
  ariaLabel: string;
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
  onFocus: () => void;
};

type EventPresentation = {
  color: 'blue' | 'red' | 'green' | 'gray';
  label: string;
  icon: ReactNode;
};

const eventTypePresentation: Record<TimelineEventType, EventPresentation> = {
  meeting: {
    color: 'blue',
    label: 'Meeting',
    icon: <CalendarOutlined aria-hidden="true" />,
  },
  release: {
    color: 'green',
    label: 'Release',
    icon: <CheckCircleOutlined aria-hidden="true" />,
  },
  incident: {
    color: 'red',
    label: 'Incident',
    icon: <WarningOutlined aria-hidden="true" />,
  },
  task: {
    color: 'gray',
    label: 'Task',
    icon: <ClockCircleOutlined aria-hidden="true" />,
  },
  reminder: {
    color: 'blue',
    label: 'Reminder',
    icon: <NotificationOutlined aria-hidden="true" />,
  },
};

const defaultPresentation: EventPresentation = {
  color: 'blue',
  label: 'Event',
  icon: <ClockCircleOutlined aria-hidden="true" />,
};

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

export const getTimelineEventPresentation = (
  event: TimelineEvent,
): EventPresentation => {
  const typePresentation = event.type
    ? eventTypePresentation[event.type]
    : undefined;

  return {
    color: event.color ?? typePresentation?.color ?? defaultPresentation.color,
    label:
      event.typeLabel ?? typePresentation?.label ?? defaultPresentation.label,
    icon: typePresentation?.icon ?? defaultPresentation.icon,
  };
};

export const createTimelineEventItem = ({
  event,
  isActive,
  buttonRef,
  itemId,
  ariaLabel,
  onKeyDown,
  onFocus,
}: Props) => {
  const presentation = getTimelineEventPresentation(event);

  return {
    key: event.id,
    color: presentation.color,
    icon: presentation.icon,
    content: (
      <button
        ref={buttonRef}
        id={itemId}
        type="button"
        tabIndex={isActive ? 0 : -1}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        aria-label={ariaLabel}
        style={{
          appearance: 'none',
          background: 'transparent',
          border: 'none',
          padding: 0,
          textAlign: 'left',
          cursor: 'pointer',
          display: 'inline-block',
          width: '100%',
          maxWidth: 420,
          borderRadius: 8,
          boxShadow: isActive ? '0 0 0 2px #1677ff' : 'none',
        }}
      >
        <Card
          size="small"
          styles={{ body: { padding: 12 } }}
          style={{
            borderRadius: 8,
          }}
        >
          <Space orientation="vertical" size={8}>
            <Space size={8} wrap>
              <Tag color={presentation.color} icon={presentation.icon}>
                {presentation.label}
              </Tag>
            </Space>

            <Space orientation="vertical" size={4}>
              <Typography.Text strong>{event.title}</Typography.Text>

              <Typography.Text type="secondary">
                {formatTime(event.date)}
              </Typography.Text>

              {event.description ? (
                <Typography.Text type="secondary">
                  {event.description}
                </Typography.Text>
              ) : null}
            </Space>
          </Space>
        </Card>
      </button>
    ),
  };
};
