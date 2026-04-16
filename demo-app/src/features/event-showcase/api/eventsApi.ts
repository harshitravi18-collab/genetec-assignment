import type { DemoEvent } from '../types';

type GetEventsResponse = {
  data: DemoEvent[];
};

export const getEvents = async (): Promise<DemoEvent[]> => {
  const response = await fetch('/api/events');

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const json = (await response.json()) as GetEventsResponse;

  return json.data;
};
