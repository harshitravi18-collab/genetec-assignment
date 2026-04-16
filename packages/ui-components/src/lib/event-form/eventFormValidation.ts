import type { EventFormErrors, EventFormValues } from './EventForm.types';

export const validateEventForm = (
  values: EventFormValues,
  t: (key: string) => string,
): EventFormErrors => {
  const errors: EventFormErrors = {};

  if (!values.title.trim()) {
    errors.title = t('eventForm.validation.titleRequired');
  }

  if (!values.date || !values.date.isValid()) {
    errors.date = t('eventForm.validation.dateRequired');
  }

  return errors;
};
