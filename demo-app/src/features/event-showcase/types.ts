export type DemoEventCategory =
  | 'meeting'
  | 'workshop'
  | 'deadline'
  | 'presentation'
  | 'training';

export type DemoEvent = {
  id: string;
  title: string;
  date: string;
  description?: string;
  location?: string;
  category: DemoEventCategory;
};
