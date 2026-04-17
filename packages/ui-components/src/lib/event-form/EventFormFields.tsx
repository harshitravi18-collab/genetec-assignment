import { DatePicker, Input } from 'antd';
import type { InputRef } from 'antd';
import type { RefObject } from 'react';
import type { EventFormErrors, EventFormValues } from './EventForm.types';

type DatePickerRef = React.ElementRef<typeof DatePicker>;

type EventFormFieldsProps = {
  values: EventFormValues;
  errors: EventFormErrors;
  titleLabel: string;
  dateLabel: string;
  descriptionLabel: string;
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  titleInputRef: RefObject<InputRef | null>;
  datePickerRef: RefObject<DatePickerRef | null>;
  onTitleChange: (value: string) => void;
  onDateChange: (value: EventFormValues['date']) => void;
  onDescriptionChange: (value: string) => void;
};

export const EventFormFields = ({
  values,
  errors,
  titleLabel,
  dateLabel,
  descriptionLabel,
  titlePlaceholder,
  descriptionPlaceholder,
  titleInputRef,
  datePickerRef,
  onTitleChange,
  onDateChange,
  onDescriptionChange,
}: EventFormFieldsProps) => {
  return (
    <div data-testid="event-form-fields" style={{ display: 'grid', gap: 16 }}>
      <div
        data-testid="event-form-title-field"
        style={{ display: 'grid', gap: 6 }}
      >
        <label htmlFor="event-title">{titleLabel}</label>
        <Input
          data-testid="event-form-title-input"
          id="event-title"
          ref={titleInputRef}
          value={values.title}
          onChange={(event) => onTitleChange(event.currentTarget.value)}
          placeholder={titlePlaceholder}
          status={errors.title ? 'error' : ''}
        />
        {errors.title ? (
          <div
            data-testid="event-form-title-error"
            role="alert"
            style={{ color: '#ff4d4f', fontSize: 12 }}
          >
            {errors.title}
          </div>
        ) : null}
      </div>

      <div
        data-testid="event-form-date-field"
        style={{ display: 'grid', gap: 6 }}
      >
        <label htmlFor="event-date">{dateLabel}</label>
        <DatePicker
          data-testid="event-form-date-input"
          id="event-date"
          ref={datePickerRef}
          value={values.date}
          onChange={(value) => onDateChange(value)}
          showTime
          style={{ width: '100%' }}
          status={errors.date ? 'error' : ''}
        />
        {errors.date ? (
          <div
            data-testid="event-form-date-error"
            role="alert"
            style={{ color: '#ff4d4f', fontSize: 12 }}
          >
            {errors.date}
          </div>
        ) : null}
      </div>

      <div
        data-testid="event-form-description-field"
        style={{ display: 'grid', gap: 6 }}
      >
        <label htmlFor="event-description">{descriptionLabel}</label>
        <Input.TextArea
          data-testid="event-form-description-input"
          id="event-description"
          value={values.description}
          onChange={(event) => onDescriptionChange(event.currentTarget.value)}
          placeholder={descriptionPlaceholder}
          rows={4}
        />
      </div>
    </div>
  );
};
