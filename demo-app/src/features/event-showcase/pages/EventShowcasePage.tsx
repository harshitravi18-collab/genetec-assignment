import { useState } from 'react';
import { Button, Card, Col, Divider, Row, Space, Tag, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { EventFormModal } from '../components/EventFormModal';
import { EventGridSection } from '../components/EventGridSection';
import { EventTimelineSection } from '../components/EventTimelineSection';
import { useEventsQuery } from '../hooks/useEventShowcase';

const { Title, Paragraph, Text } = Typography;

export function EventShowcasePage() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useEventsQuery();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setIsCreateModalOpen(true)}
            >
              {t('eventShowcase.actions.newEvent')}
            </Button>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]} align="stretch">
        <Col xs={24} xl={14}>
          <EventGridSection data={data} isLoading={isLoading} error={error} />
        </Col>

        <Col xs={24} xl={10}>
          <EventTimelineSection
            data={data}
            isLoading={isLoading}
            error={error}
          />
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

      <EventFormModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Space>
  );
}
