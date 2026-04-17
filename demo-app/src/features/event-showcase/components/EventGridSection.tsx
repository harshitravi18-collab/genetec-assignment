import { Alert, Card, Empty, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import { DataGrid } from '@org/ui-components';
import { useTranslation } from 'react-i18next';
import type { DemoEvent } from '../types';
import { Tag } from 'antd';
import { getEventColor } from '../utils/eventUtils';

type EventGridSectionProps = {
  data?: DemoEvent[];
  isLoading: boolean;
  error: unknown;
};

export function EventGridSection({
  data,
  isLoading,
  error,
}: EventGridSectionProps) {
  const { t } = useTranslation();

  return (
    <Card
      data-testid="event-grid-section"
      title={t('eventShowcase.sections.grid.title')}
      extra={
        <Typography.Text type="secondary">
          {t('eventShowcase.sections.grid.extra')}
        </Typography.Text>
      }
      styles={{
        body: {
          minHeight: 450,
        },
      }}
    >
      {isLoading ? (
        <Spin data-testid="event-grid-loading" />
      ) : error ? (
        <Alert
          data-testid="event-grid-error"
          type="error"
          showIcon
          title={t('common.error')}
          description={t('eventShowcase.sections.grid.error')}
        />
      ) : !data || data.length === 0 ? (
        <Empty
          data-testid="event-grid-empty"
          description={t('common.noData')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <DataGrid
          data-testid="event-grid-data"
          data={data}
          columns={[
            {
              key: 'title',
              label: t('eventForm.fields.title'),
              accessor: (item) => item.title,
              sortable: true,
              sortAccessor: (item) => item.title.toLowerCase(),
              filterable: true,
              filterAccessor: (item) => item.title,
            },
            {
              key: 'date',
              label: t('eventForm.fields.date'),
              accessor: (item) => dayjs(item.date).format('MMM D, YYYY HH:mm'),
              sortable: true,
              sortAccessor: (item) => dayjs(item.date).valueOf(),
              filterable: true,
              filterAccessor: (item) =>
                dayjs(item.date).format('MMM D, YYYY HH:mm'),
            },
            {
              key: 'category',
              label: t('event.category.label'),
              accessor: (item) => (
                <Tag color={getEventColor(item.category)}>
                  {t(`event.category.${item.category}`)}
                </Tag>
              ),
              sortable: true,
              sortAccessor: (item) =>
                t(`event.category.${item.category}`).toLowerCase(),
              filterable: true,
              filterAccessor: (item) => t(`event.category.${item.category}`),
            },
            {
              key: 'location',
              label: t('event.location'),
              accessor: (item) => item.location ?? '—',
              sortable: true,
              sortAccessor: (item) => (item.location ?? '').toLowerCase(),
              filterable: true,
              filterAccessor: (item) => item.location ?? '',
            },
            {
              key: 'description',
              label: t('eventForm.fields.description'),
              accessor: (item) => item.description ?? '—',
            },
          ]}
          scrollY={345}
        />
      )}
    </Card>
  );
}
