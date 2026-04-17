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
    <div data-testid={`timeline-day-header-${day}`} style={{ paddingBottom: 4 }}>
      <Typography.Title data-testid={`timeline-day-title-${day}`} id={headingId} level={5} style={{ margin: 0 }}>
        {day}
      </Typography.Title>

      <Typography.Text data-testid={`timeline-day-count-${day}`} type="secondary">
        {eventCount} {eventCount === 1 ? 'event' : 'events'}
      </Typography.Text>
    </div>
  ),
});
