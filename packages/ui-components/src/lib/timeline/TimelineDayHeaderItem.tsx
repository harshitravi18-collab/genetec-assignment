import { Typography } from 'antd';

export const createTimelineDayHeaderItem = (day: string) => ({
  key: `day-${day}`,
  dot: <span />,
  children: (
    <div style={{ paddingBottom: 4 }}>
      <Typography.Title level={5} style={{ margin: 0 }}>
        {day}
      </Typography.Title>
    </div>
  ),
});
