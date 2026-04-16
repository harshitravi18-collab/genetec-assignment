import dayjs from 'dayjs';
import { Modal } from 'antd';
import { EventForm } from '@org/ui-components';
import { useTranslation } from 'react-i18next';
import { useCreateEventMutation } from '../hooks/useCreateEventMutation';
import type { DemoEventCategory } from '../types';

type EventFormModalProps = {
  open: boolean;
  onClose: () => void;
};

export function EventFormModal({ open, onClose }: EventFormModalProps) {
  const { t } = useTranslation();
  const createEventMutation = useCreateEventMutation();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      title={t('eventShowcase.actions.newEvent')}
    >
      <EventForm
        mode="add"
        onCancel={onClose}
        onSave={async (values) => {
          await createEventMutation.mutateAsync({
            title: values.title,
            date: values.date,
            description: values.description,
            location: 'Remote',
            category: 'meeting' as DemoEventCategory,
          });

          onClose();
        }}
        initialValues={{
          title: '',
          date: dayjs(),
          description: '',
        }}
      />
    </Modal>
  );
}
