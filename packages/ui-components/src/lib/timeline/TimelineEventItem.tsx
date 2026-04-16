import { ClockCircleOutlined } from '@ant-design/icons';
import { Card, Space, Typography } from 'antd';
import type { TimelineEvent } from './Timeline.types';

type Props = {
  event: TimelineEvent;
  isFocused: boolean;
};

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

export const createTimelineEventItem = ({ event, isFocused }: Props) => ({
  key: event.id,
  color: event.color ?? 'blue',
  dot: <ClockCircleOutlined />,
  children: (
    <div
      tabIndex={isFocused ? 0 : -1}
      style={{
        outline: isFocused ? '2px solid #1677ff' : 'none',
        borderRadius: 8,
        display: 'inline-block',
        width: '100%',
        maxWidth: 420,
      }}
    >
      <Card size="small" styles={{ body: { padding: 12 } }}>
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
      </Card>
    </div>
  ),
});
