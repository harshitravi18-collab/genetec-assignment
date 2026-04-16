import { Alert, Card, Empty, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import { DataGrid } from '@org/ui-components';
import { useTranslation } from 'react-i18next';
import type { DemoEvent } from '../types';

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
      title={t('eventShowcase.sections.grid.title')}
      extra={
        <Typography.Text type="secondary">
          {t('eventShowcase.sections.grid.extra')}
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
          title={t('common.error')}
          description={t('eventShowcase.sections.grid.error')}
        />
      ) : !data || data.length === 0 ? (
        <Empty
          description={t('common.noData')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <DataGrid
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
              accessor: (item) => dayjs(item.date).format('YYYY-MM-DD HH:mm'),
              sortable: true,
              sortAccessor: (item) => dayjs(item.date).valueOf(),
              filterable: true,
              filterAccessor: (item) =>
                dayjs(item.date).format('YYYY-MM-DD HH:mm'),
            },
            {
              key: 'category',
              label: t('event.category.label'),
              accessor: (item) => t(`event.category.${item.category}`),
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
