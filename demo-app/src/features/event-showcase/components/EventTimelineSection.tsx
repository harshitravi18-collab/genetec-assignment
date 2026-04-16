import { Alert, Card, Empty, Spin, Typography } from 'antd';
import { Timeline } from '@org/ui-components';
import { useTranslation } from 'react-i18next';
import type { DemoEvent } from '../types';

type EventTimelineSectionProps = {
  data?: DemoEvent[];
  isLoading: boolean;
  error: unknown;
};

const getTimelineColor = (
  category: DemoEvent['category'],
): 'blue' | 'red' | 'green' | 'gray' => {
  switch (category) {
    case 'meeting':
      return 'blue';
    case 'workshop':
      return 'green';
    case 'deadline':
      return 'red';
    case 'presentation':
      return 'gray';
    case 'training':
      return 'blue';
    default:
      return 'gray';
  }
};

export function EventTimelineSection({
  data,
  isLoading,
  error,
}: EventTimelineSectionProps) {
  const { t } = useTranslation();

  const timelineEvents = data?.slice(0, 50) ?? [];

  return (
    <Card
      title={t('eventShowcase.sections.timeline.title')}
      extra={
        <Typography.Text type="secondary">
          {t('eventShowcase.sections.timeline.extra')}
        </Typography.Text>
      }
      styles={{
        body: {
          minHeight: 420,
        },
      }}
    >
      {isLoading ? (
        <Spin />
      ) : error ? (
        <Alert
          type="error"
          showIcon
          message={t('common.error')}
          description={t('eventShowcase.sections.timeline.error')}
        />
      ) : timelineEvents.length === 0 ? (
        <Empty
          description={t('common.noData')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <div style={{ maxHeight: 550, overflowY: 'auto', paddingRight: 8 }}>
          <Timeline
            events={timelineEvents.map((event) => ({
              id: event.id,
              title: event.title,
              date: event.date,
              description: event.description,
              color: getTimelineColor(event.category),
            }))}
          />
        </div>
      )}
    </Card>
  );
}
