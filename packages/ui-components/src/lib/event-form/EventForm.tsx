import { Alert, Button, Card, Space, DatePicker } from 'antd';
import type { InputRef } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EventFormFields } from './EventFormFields';
import { validateEventForm } from './eventFormValidation';

import type {
  EventFormErrors,
  EventFormProps,
  EventFormValues,
} from './EventForm.types';

type EventDatePickerRef = React.ElementRef<typeof DatePicker>;

const getInitialFormValues = (
  initialValues?: Partial<EventFormValues>,
): EventFormValues => ({
  title: initialValues?.title ?? '',
  date: initialValues?.date ?? null,
  description: initialValues?.description ?? '',
});

export function EventForm({
  mode = 'add',
  initialValues,
  onCancel,
  onSave,
}: EventFormProps) {
  const { t } = useTranslation();

  const [values, setValues] = useState<EventFormValues>(
    getInitialFormValues(initialValues),
  );
  const [errors, setErrors] = useState<EventFormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const titleInputRef = useRef<InputRef>(null);
  const datePickerRef = useRef<EventDatePickerRef | null>(null);

  const titleText = useMemo(
    () =>
      mode === 'edit' ? t('eventForm.editTitle') : t('eventForm.addTitle'),
    [mode, t],
  );

  const submitText = useMemo(
    () =>
      mode === 'edit'
        ? t('eventForm.actions.save')
        : t('eventForm.actions.create'),
    [mode, t],
  );

  const focusFirstInvalidField = (nextErrors: EventFormErrors) => {
    if (nextErrors.title) {
      titleInputRef.current?.focus();
      return;
    }

    if (nextErrors.date) {
      datePickerRef.current?.focus();
    }
  };

  const handleSubmit = async () => {
    setSuccessMessage('');
    setSubmitError('');

    const nextErrors = validateEventForm(values, t);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalidField(nextErrors);
      return;
    }

    try {
      setIsSaving(true);

      await onSave({
        title: values.title.trim(),
        date: values.date?.toISOString() ?? '',
        description: values.description.trim() || undefined,
      });

      setSuccessMessage(
        mode === 'edit'
          ? t('eventForm.success.updated')
          : t('eventForm.success.created'),
      );

      if (mode === 'add') {
        setValues({
          title: '',
          date: null,
          description: '',
        });
        setErrors({});
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : t('eventForm.error.generic'),
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card data-testid="event-form-card" title={titleText}>
      <div data-testid="event-form-body" style={{ display: 'grid', gap: 16 }}>
        <EventFormFields
          data-testid="event-form-fields"
          values={values}
          errors={errors}
          titleLabel={t('eventForm.fields.title')}
          dateLabel={t('eventForm.fields.date')}
          descriptionLabel={t('eventForm.fields.description')}
          titlePlaceholder={t('eventForm.placeholders.title')}
          descriptionPlaceholder={t('eventForm.placeholders.description')}
          titleInputRef={titleInputRef}
          datePickerRef={datePickerRef}
          onTitleChange={(title) => {
            setValues((previous) => ({ ...previous, title }));
            setErrors((previous) => ({ ...previous, title: undefined }));
          }}
          onDateChange={(date) => {
            setValues((previous) => ({ ...previous, date }));
            setErrors((previous) => ({ ...previous, date: undefined }));
          }}
          onDescriptionChange={(description) => {
            setValues((previous) => ({ ...previous, description }));
          }}
        />

        <Space>
          <Button data-testid="event-form-cancel" onClick={onCancel}>{t('eventForm.actions.cancel')}</Button>

          <Button
            data-testid="event-form-submit"
            type="primary"
            loading={isSaving}
            onClick={() => void handleSubmit()}
          >
            {submitText}
          </Button>
        </Space>

        {submitError ? (
          <Alert data-testid="event-form-submit-error" type="error" showIcon message={submitError} />
        ) : null}

        {successMessage ? (
          <div data-testid="event-form-success" aria-live="polite">
            <Alert data-testid="event-form-success-alert" type="success" showIcon message={successMessage} />
          </div>
        ) : null}
      </div>
    </Card>
  );
}
