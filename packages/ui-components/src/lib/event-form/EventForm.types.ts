import type { Dayjs } from 'dayjs';

export type EventFormValues = {
  title: string;
  date: Dayjs | null;
  description: string;
};

export type EventFormSubmitValues = {
  title: string;
  date: string;
  description?: string;
};

export type EventFormErrors = {
  title?: string;
  date?: string;
};

export type EventFormMode = 'add' | 'edit';

export type EventFormProps = {
  mode?: EventFormMode;
  initialValues?: Partial<EventFormValues>;
  onCancel: () => void;
  onSave: (values: EventFormSubmitValues) => Promise<void> | void;
};
