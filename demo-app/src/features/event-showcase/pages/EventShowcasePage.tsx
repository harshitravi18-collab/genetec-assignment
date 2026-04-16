import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import {
  CalendarOutlined,
  PlusOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEventsQuery } from '../hooks/useEventShowcase';

import { EventGridSection } from '../components/EventGridSection';

const { Title, Paragraph, Text } = Typography;

export function EventShowcasePage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useEventsQuery();

  return (
    <Space orientation="vertical" size={24} style={{ width: '100%' }}>
      <Card
        styles={{
          body: {
            padding: 24,
          },
        }}
      >
        <Row gutter={[24, 24]} align="middle" justify="space-between">
          <Col xs={24} lg={16}>
            <Space orientation="vertical" size={8}>
              <Space wrap>
                <Tag color="blue">
                  {t('eventShowcase.tags.GenetecEventApp')}
                </Tag>
                <Tag color="purple">
                  {t('eventShowcase.tags.componentLibrary')}
                </Tag>
              </Space>

              <Title level={2} style={{ margin: 0 }}>
                {t('eventShowcase.hero.title')}
              </Title>

              <Paragraph style={{ margin: 0, maxWidth: 760 }}>
                {t('eventShowcase.hero.description')}
              </Paragraph>

              <Text type="secondary">{t('eventShowcase.hero.helperText')}</Text>
            </Space>
          </Col>

          <Col xs={24} lg="auto">
            <Button type="primary" icon={<PlusOutlined />} size="large">
              {t('eventShowcase.actions.newEvent')}
            </Button>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} xl={14}>
          <Card
            title={
              <Space>
                <TableOutlined />
                <span>{t('eventShowcase.sections.grid.title')}</span>
              </Space>
            }
            extra={
              <Text type="secondary">
                {t('eventShowcase.sections.grid.extra')}
              </Text>
            }
            style={{ height: '100%' }}
            styles={{
              body: {
                minHeight: 420,
              },
            }}
          >
            <EventGridSection data={data} isLoading={isLoading} error={error} />
          </Card>
        </Col>

        <Col xs={24} xl={10}>
          <Card
            title={
              <Space>
                <CalendarOutlined />
                <span>{t('eventShowcase.sections.timeline.title')}</span>
              </Space>
            }
            extra={
              <Text type="secondary">
                {t('eventShowcase.sections.timeline.extra')}
              </Text>
            }
            style={{ height: '100%' }}
            styles={{
              body: {
                minHeight: 420,
              },
            }}
          >
            <Empty
              description={t('eventShowcase.sections.timeline.empty')}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Title level={4} style={{ marginTop: 0 }}>
          {t('eventShowcase.plan.title')}
        </Title>

        <Paragraph style={{ marginBottom: 12 }}>
          {t('eventShowcase.plan.description')}
        </Paragraph>

        <Divider style={{ margin: '16px 0' }} />

        <Space wrap>
          <Tag>{t('eventShowcase.plan.steps.shell')}</Tag>
          <Tag>{t('eventShowcase.plan.steps.msw')}</Tag>
          <Tag>{t('eventShowcase.plan.steps.state')}</Tag>
          <Tag>{t('eventShowcase.plan.steps.grid')}</Tag>
          <Tag>{t('eventShowcase.plan.steps.timeline')}</Tag>
          <Tag>{t('eventShowcase.plan.steps.form')}</Tag>
        </Space>
      </Card>
    </Space>
  );
}
