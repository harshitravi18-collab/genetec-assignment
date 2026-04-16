import type { DemoEvent } from '../types';

type GetEventsResponse = {
  data: DemoEvent[];
};

type CreateEventInput = Omit<DemoEvent, 'id'>;

type CreateEventResponse = {
  data: DemoEvent;
};

export const getEvents = async (): Promise<DemoEvent[]> => {
  const response = await fetch('/api/events');

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const json = (await response.json()) as GetEventsResponse;

  return json.data;
};

export const createEvent = async (
  input: CreateEventInput,
): Promise<DemoEvent> => {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error('Failed to create event');
  }

  const json = (await response.json()) as CreateEventResponse;

  return json.data;
};
