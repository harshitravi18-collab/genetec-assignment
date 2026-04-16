import { Typography } from 'antd';

type TimelineDayHeaderItemArgs = {
  day: string;
  headingId: string;
  eventCount: number;
};

export const createTimelineDayHeaderItem = ({
  day,
  headingId,
  eventCount,
}: TimelineDayHeaderItemArgs) => ({
  key: `day-${day}`,
  icon: <span aria-hidden="true" />,
  content: (
    <div style={{ paddingBottom: 4 }}>
      <Typography.Title id={headingId} level={5} style={{ margin: 0 }}>
        {day}
      </Typography.Title>

      <Typography.Text type="secondary">
        {eventCount} {eventCount === 1 ? 'event' : 'events'}
      </Typography.Text>
    </div>
  ),
});
