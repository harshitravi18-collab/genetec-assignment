import { useState } from 'react';
import { Col, Row } from 'antd';
import { AppShell } from '../../../components/AppShell';
import { EventFormModal } from '../components/EventFormModal';
import { EventGridSection } from '../components/EventGridSection';
import { EventTimelineSection } from '../components/EventTimelineSection';
import { useEventsQuery } from '../hooks/useEventShowcase';

export function EventShowcasePage() {
  const { data, isLoading, error } = useEventsQuery();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <AppShell onCreateEvent={() => setIsCreateModalOpen(true)}>
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

      <EventFormModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </AppShell>
  );
}
